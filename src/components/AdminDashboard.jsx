// src/components/AdminDashboard.jsx
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  LogOut,
  Users,
  Search,
  Eye,
  Mail,
  Phone,
  BookOpen,
  CheckCircle,
  XCircle,
  Loader,
  Edit,
  Trash2,
  Printer,
  Calendar,
  Clock,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Settings,
  BarChart3,
  FileSpreadsheet,
  CreditCard,
  X,
  Filter,
  Sparkles,
  MapPin,
  GraduationCap,
  Copy,
  Check,
  AlertTriangle,
  TrendingUp,
  PieChart,
  Award,
  Gift,
  Rocket,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;
const EASE = [0.22, 1, 0.36, 1];

// ─── Helper Functions ─────────────────────────────────────────────
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const formatTime = (dateString) => {
  if (!dateString) return "--:--";
  try {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "--:--";
  }
};

// ─── Skeleton Loader ──────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3.5">
      <div className="h-4 w-4 bg-slate-200 rounded"></div>
    </td>
    <td className="px-4 py-3.5">
      <div className="h-4 w-16 bg-slate-200 rounded"></div>
    </td>
    <td className="px-4 py-3.5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        <div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
          <div className="h-3 w-24 bg-slate-200 rounded mt-1"></div>
        </div>
      </div>
    </td>
    <td className="px-4 py-3.5 hidden lg:table-cell">
      <div className="h-4 w-40 bg-slate-200 rounded"></div>
    </td>
    <td className="px-4 py-3.5 hidden xl:table-cell">
      <div className="h-4 w-20 bg-slate-200 rounded"></div>
    </td>
    <td className="px-4 py-3.5">
      <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
    </td>
    <td className="px-4 py-3.5 hidden lg:table-cell">
      <div className="h-4 w-28 bg-slate-200 rounded"></div>
    </td>
    <td className="px-4 py-3.5 text-center">
      <div className="h-8 w-8 bg-slate-200 rounded-full mx-auto"></div>
    </td>
  </tr>
);

// ─── Sub-Components ───────────────────────────────────────────────

// Program Type Badge
function ProgramTypeBadge({ type }) {
  if (!type) return <span className="text-xs text-slate-400">—</span>;
  const isFounding = type.toLowerCase() === "founding";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full border shadow-sm ${
        isFounding
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-purple-50 text-purple-700 border-purple-200"
      }`}
    >
      {isFounding ? (
        <Gift className="w-3 h-3" />
      ) : (
        <Rocket className="w-3 h-3" />
      )}
      {isFounding ? "Founding Batch" : "Career Program"}
    </span>
  );
}

// Stats Card with gradient
function StatCard({
  label,
  value,
  icon: Icon,
  color = "blue",
  className = "",
  trend,
  trendLabel,
  subtext,
}) {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    amber: "from-amber-500 to-amber-600",
    emerald: "from-emerald-500 to-emerald-600",
    rose: "from-rose-500 to-rose-600",
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    teal: "from-teal-500 to-teal-600",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`relative overflow-hidden bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all ${className}`}
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {value}
          </p>
          {subtext && (
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
              {subtext}
            </p>
          )}
          {trend !== undefined && (
            <p
              className={`text-[10px] font-bold mt-0.5 ${trend > 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% {trendLabel}
            </p>
          )}
        </div>
        <div
          className={`p-3.5 rounded-2xl bg-gradient-to-br ${colorMap[color]} shadow-md`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function SortableTh({
  label,
  field,
  sortField,
  sortOrder,
  onSort,
  className = "",
}) {
  const active = sortField === field;
  return (
    <th
      onClick={() => onSort(field)}
      className={`text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-800 transition-colors select-none group ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        {active ? (
          sortOrder === "asc" ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#0956fc]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#0956fc]" />
          )
        ) : (
          <ChevronDown className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </th>
  );
}

function StatusBadge({ status }) {
  const s = (status || "pending").toLowerCase();
  if (s === "approved") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
        <CheckCircle className="w-3 h-3" /> Approved
      </span>
    );
  }
  if (s === "rejected") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 shadow-sm">
        <XCircle className="w-3 h-3" /> Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
      <Clock className="w-3 h-3 animate-pulse" /> Pending
    </span>
  );
}

// ─── Copyable App ID ─────────────────────────────────────────────
function CopyableId({ id }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    toast.success("App ID copied!");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-1 group">
      <span className="text-xs font-mono font-bold text-[#0956fc] bg-blue-50 border border-blue-100 px-2 py-1 rounded-md">
        {id}
      </span>
      <button
        onClick={handleCopy}
        className="p-1 text-slate-400 hover:text-[#0956fc] transition-colors rounded-md hover:bg-blue-50"
        title="Copy ID"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}

// ─── Admit Card ──────────────────────────────────────────────────
const AdmitCardPreview = ({ app }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md mx-auto print:shadow-none print:border-none print:max-w-none">
    <div className="text-center border-b border-slate-200 pb-4">
      <img src="/STA-logo.png" alt="STA" className="h-12 mx-auto mb-2" />
      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
        ADMIT CARD
      </h3>
      <p className="text-xs text-slate-500 font-medium">
        Shine Tech Academy – Academic Session 2026
      </p>
    </div>
    <div className="flex items-center gap-4 py-4 border-b border-slate-100">
      {app?.photo_url ? (
        <img
          src={app.photo_url}
          alt={app.full_name}
          className="w-20 h-20 rounded-2xl object-cover border-2 border-[#0956fc] shadow-sm"
        />
      ) : (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-[#0956fc] font-black text-2xl border border-blue-200">
          {app?.full_name?.charAt(0) || "S"}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-900 text-lg truncate">
          {app?.full_name}
        </p>
        <p className="text-xs font-mono font-bold text-[#0956fc] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md inline-block my-1">
          ID: {app?.app_id || "N/A"}
        </p>
        <p className="text-xs text-slate-500 font-medium truncate">
          {app?.courses?.[0] || "General Course"}
        </p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 py-4 text-xs">
      <div>
        <span className="text-slate-400 block font-semibold text-[10px] uppercase">
          Father Name
        </span>
        <span className="text-slate-800 font-bold">
          {app?.father_name || "N/A"}
        </span>
      </div>
      <div>
        <span className="text-slate-400 block font-semibold text-[10px] uppercase">
          DOB
        </span>
        <span className="text-slate-800 font-bold">{app?.dob || "N/A"}</span>
      </div>
      <div>
        <span className="text-slate-400 block font-semibold text-[10px] uppercase">
          Phone
        </span>
        <span className="text-slate-800 font-bold">{app?.phone || "N/A"}</span>
      </div>
      <div>
        <span className="text-slate-400 block font-semibold text-[10px] uppercase">
          City
        </span>
        <span className="text-slate-800 font-bold">{app?.city || "N/A"}</span>
      </div>
      <div className="col-span-2">
        <span className="text-slate-400 block font-semibold text-[10px] uppercase">
          Submission Time
        </span>
        <span className="text-slate-800 font-bold">
          {formatDate(app?.created_at)} at {formatTime(app?.created_at)}
        </span>
      </div>
    </div>
    <div className="text-center border-t border-slate-200 pt-4 text-[11px] text-slate-400">
      <p className="font-semibold text-slate-500">
        Valid for Session 2026-2027
      </p>
      <p className="mt-0.5">Officially verified system generated admit pass.</p>
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────
export function AdminDashboard() {
  const { signOut } = useAuth();
  const reduceMotion = useReducedMotion();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Stats state
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    today: 0,
    founding: 0,
    career: 0,
  });

  // Course enrollment stats
  const [courseStats, setCourseStats] = useState([]);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounced(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchDebounced, filterStatus, filterType, sortField, sortOrder]);

  const buildQuery = useCallback(
    (query) => {
      let q = query;
      if (filterStatus !== "all") {
        if (filterStatus === "pending") {
          q = q.or("status.eq.pending,status.is.null");
        } else {
          q = q.eq("status", filterStatus);
        }
      }
      if (filterType !== "all") {
        q = q.eq("program_type", filterType);
      }
      if (searchDebounced) {
        const searchLower = searchDebounced.toLowerCase();
        q = q.or(
          `full_name.ilike.%${searchLower}%,` +
            `email.ilike.%${searchLower}%,` +
            `app_id.ilike.%${searchLower}%,` +
            `phone.ilike.%${searchLower}%`,
        );
      }
      return q;
    },
    [filterStatus, filterType, searchDebounced],
  );

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("admissions")
        .select("*", { count: "exact" })
        .order(sortField, { ascending: sortOrder === "asc" })
        .range(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE - 1,
        );

      query = buildQuery(query);

      const { data, count, error } = await query;
      if (error) throw error;
      setApplications(data || []);
      setTotalCount(count || 0);
      setLastRefreshed(new Date());
    } catch (err) {
      toast.error("Failed to load applications: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortField, sortOrder, buildQuery]);

  const fetchStats = useCallback(async () => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const [
        totalRes,
        pendingRes,
        approvedRes,
        rejectedRes,
        todayRes,
        foundingRes,
        careerRes,
      ] = await Promise.allSettled([
        supabase
          .from("admissions")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("admissions")
          .select("id", { count: "exact", head: true })
          .or("status.eq.pending,status.is.null"),
        supabase
          .from("admissions")
          .select("id", { count: "exact", head: true })
          .eq("status", "approved"),
        supabase
          .from("admissions")
          .select("id", { count: "exact", head: true })
          .eq("status", "rejected"),
        supabase
          .from("admissions")
          .select("id", { count: "exact", head: true })
          .gte("created_at", startOfDay.toISOString()),
        supabase
          .from("admissions")
          .select("id", { count: "exact", head: true })
          .eq("program_type", "founding"),
        supabase
          .from("admissions")
          .select("id", { count: "exact", head: true })
          .eq("program_type", "career"),
      ]);

      setStats({
        total: totalRes.status === "fulfilled" ? totalRes.value.count || 0 : 0,
        pending:
          pendingRes.status === "fulfilled" ? pendingRes.value.count || 0 : 0,
        approved:
          approvedRes.status === "fulfilled" ? approvedRes.value.count || 0 : 0,
        rejected:
          rejectedRes.status === "fulfilled" ? rejectedRes.value.count || 0 : 0,
        today: todayRes.status === "fulfilled" ? todayRes.value.count || 0 : 0,
        founding:
          foundingRes.status === "fulfilled" ? foundingRes.value.count || 0 : 0,
        career:
          careerRes.status === "fulfilled" ? careerRes.value.count || 0 : 0,
      });
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  }, []);

  const fetchCourseStats = useCallback(async () => {
    try {
      // Get all admissions with courses array
      const { data, error } = await supabase
        .from("admissions")
        .select("courses, program_type");

      if (error) throw error;

      // Count enrollments per course
      const courseCounts = {};
      const foundingCounts = {};
      const careerCounts = {};

      (data || []).forEach((app) => {
        const courses = app.courses || [];
        const type = app.program_type || "unknown";
        courses.forEach((course) => {
          if (!courseCounts[course]) courseCounts[course] = 0;
          courseCounts[course]++;

          if (type === "founding") {
            if (!foundingCounts[course]) foundingCounts[course] = 0;
            foundingCounts[course]++;
          } else if (type === "career") {
            if (!careerCounts[course]) careerCounts[course] = 0;
            careerCounts[course]++;
          }
        });
      });

      // Convert to array and sort
      const sortedCourses = Object.keys(courseCounts)
        .map((name) => ({
          name,
          total: courseCounts[name],
          founding: foundingCounts[name] || 0,
          career: careerCounts[name] || 0,
        }))
        .sort((a, b) => b.total - a.total);

      setCourseStats(sortedCourses);
    } catch (err) {
      console.error("Course stats error:", err);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    fetchStats();
    fetchCourseStats();
  }, [fetchStats, fetchCourseStats]);

  const refreshAll = () => {
    toast.promise(
      Promise.all([fetchApplications(), fetchStats(), fetchCourseStats()]),
      {
        loading: "Refreshing data...",
        success: "Data refreshed!",
        error: "Refresh failed",
      },
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === applications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(applications.map((a) => a.id));
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSingleStatusUpdate = async (id, status) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("admissions")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      toast.success(`Application marked as ${status}`);
      if (selectedApp && selectedApp.id === id)
        setSelectedApp((prev) => ({ ...prev, status }));
      refreshAll();
    } catch (err) {
      toast.error("Status update failed: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleEdit = (app) => {
    setEditForm({ ...app });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const coursesArr =
        typeof editForm.courses === "string"
          ? editForm.courses
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : editForm.courses;

      const { error } = await supabase
        .from("admissions")
        .update({
          full_name: editForm.full_name,
          father_name: editForm.father_name,
          gender: editForm.gender,
          dob: editForm.dob,
          email: editForm.email,
          phone: editForm.phone,
          address: editForm.address,
          city: editForm.city,
          qualification: editForm.qualification,
          institute: editForm.institute,
          courses: coursesArr,
          custom_course: editForm.custom_course,
          status: editForm.status || "pending",
          program_type: editForm.program_type || "founding",
        })
        .eq("id", editForm.id);

      if (error) throw error;
      toast.success("Application updated successfully!");
      setShowEditModal(false);
      refreshAll();
    } catch (err) {
      toast.error("Update failed: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    setDeleting(true);
    try {
      const { error } = await supabase.from("admissions").delete().eq("id", id);
      if (error) throw error;
      toast.success("Application deleted.");
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
      refreshAll();
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (
      !window.confirm(
        `Delete ${selectedIds.length} selected applications permanently?`,
      )
    )
      return;
    setDeleting(true);
    try {
      const { error } = await supabase
        .from("admissions")
        .delete()
        .in("id", selectedIds);
      if (error) throw error;
      toast.success(`${selectedIds.length} applications deleted.`);
      setSelectedIds([]);
      refreshAll();
    } catch (err) {
      toast.error("Bulk delete failed: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkStatus = async (status) => {
    if (selectedIds.length === 0) return;
    if (
      !window.confirm(`Mark ${selectedIds.length} applications as "${status}"?`)
    )
      return;
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("admissions")
        .update({ status })
        .in("id", selectedIds);
      if (error) throw error;
      toast.success(`${selectedIds.length} applications updated to ${status}`);
      setSelectedIds([]);
      refreshAll();
    } catch (err) {
      toast.error("Bulk status update failed: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const exportCSV = async () => {
    setExporting(true);
    try {
      let query = supabase
        .from("admissions")
        .select("*")
        .order(sortField, { ascending: sortOrder === "asc" })
        .limit(10000);
      query = buildQuery(query);
      const { data, error } = await query;
      if (error) throw error;

      const headers = [
        "App ID",
        "Full Name",
        "Father Name",
        "Email",
        "Phone",
        "City",
        "Qualification",
        "Courses",
        "Program Type",
        "Status",
        "Submission Date",
        "Submission Time",
      ];
      const escapeCsv = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;
      const rows = (data || []).map((a) => [
        a.app_id,
        a.full_name,
        a.father_name,
        a.email,
        a.phone,
        a.city,
        a.qualification,
        (a.courses || []).join("; "),
        a.program_type || "founding",
        a.status || "pending",
        formatDate(a.created_at),
        formatTime(a.created_at),
      ]);
      const csv = [headers, ...rows]
        .map((r) => r.map(escapeCsv).join(","))
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `STA_Admissions_${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("CSV exported successfully!");
    } catch (err) {
      toast.error("Export failed: " + err.message);
    } finally {
      setExporting(false);
    }
  };

  const openAdmitCard = (app) => {
    setSelectedApp(app);
    setShowAdmitModal(true);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Maximum enrollment calculation for visualization scaling
  const maxEnrollment = courseStats.reduce(
    (max, c) => (c.total > max ? c.total : max),
    1,
  );

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans antialiased">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      {/* ─── Sidebar ────────────────────────────────────────────── */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-md border-r border-slate-200/80 shadow-md hidden lg:flex flex-col z-20">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <img src="/STA-logo.png" alt="STA" className="h-9 w-auto" />
          <div>
            <h2 className="text-sm font-black text-slate-800 leading-tight">
              STA Admin
            </h2>
            <p className="text-[10px] text-[#0956fc] font-bold uppercase tracking-wider">
              Management
            </p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1.5">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-[#0956fc] rounded-xl px-4 py-3 flex items-center gap-3 font-bold text-sm shadow-sm border border-blue-100">
            <Users className="w-5 h-5 text-[#0956fc]" /> Admissions
          </div>
          <div className="px-4 py-3 flex items-center gap-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all font-semibold text-sm cursor-pointer">
            <BarChart3 className="w-5 h-5" /> Analytics
          </div>
          <div className="px-4 py-3 flex items-center gap-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all font-semibold text-sm cursor-pointer">
            <CreditCard className="w-5 h-5" /> Admit Cards
          </div>
          <div className="px-4 py-3 flex items-center gap-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all font-semibold text-sm cursor-pointer">
            <Settings className="w-5 h-5" /> Settings
          </div>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all font-bold text-sm cursor-pointer"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─────────────────────────────────────────── */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-10 shadow-sm">
          <div className="px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/STA-logo.png"
                alt="STA"
                className="h-8 w-auto lg:hidden flex-shrink-0"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 truncate tracking-tight">
                  Admissions Portal
                </h1>
                <p className="text-xs text-slate-400 font-medium hidden sm:block">
                  Real-time student applications management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <span className="text-[10px] text-slate-400 font-medium hidden md:block">
                Last updated: {formatDate(lastRefreshed)}{" "}
                {formatTime(lastRefreshed)}
              </span>
              <button
                onClick={exportCSV}
                disabled={exporting}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-[#0956fc] border border-blue-100 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all font-bold disabled:opacity-60 cursor-pointer shadow-sm"
              >
                {exporting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <FileSpreadsheet className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <button
                onClick={signOut}
                className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {/* ── Stats Cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
            <StatCard
              label="Total Applications"
              value={stats.total}
              icon={Users}
              color="blue"
            />
            <StatCard
              label="Pending"
              value={stats.pending}
              icon={Clock}
              color="amber"
            />
            <StatCard
              label="Approved"
              value={stats.approved}
              icon={CheckCircle}
              color="emerald"
            />
            <StatCard
              label="Rejected"
              value={stats.rejected}
              icon={XCircle}
              color="rose"
            />
            <StatCard
              label="Submitted Today"
              value={stats.today}
              icon={Calendar}
              color="indigo"
            />
            <StatCard
              label="🎓 Founding Batch"
              value={stats.founding}
              icon={Gift}
              color="emerald"
              subtext="Free 2-Month Courses"
            />
            <StatCard
              label="💼 Career Programs"
              value={stats.career}
              icon={Rocket}
              color="purple"
              subtext="Professional Courses"
            />
          </div>

          {/* ── Course Enrollment Stats ── */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-space font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-[#0956fc]" />
                  Course Enrollment Summary
                </h3>
                <p className="text-xs text-slate-400">
                  Total students enrolled per course
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {courseStats.length === 0 ? (
                <p className="text-xs text-slate-400 col-span-full text-center py-4">
                  No course data available yet
                </p>
              ) : (
                courseStats.map((course, idx) => {
                  const percentage = Math.round(
                    (course.total / maxEnrollment) * 100,
                  );
                  return (
                    <div
                      key={idx}
                      className="bg-slate-50/70 rounded-xl p-3 border border-slate-100 hover:border-slate-200 transition-all"
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-bold text-xs text-slate-800 line-clamp-1">
                          {course.name}
                        </span>
                        <span className="bg-blue-100 text-[#0956fc] font-extrabold text-[11px] px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                          {course.total} Enrolled
                        </span>
                      </div>

                      {/* Visual Bar Indicator */}
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2 overflow-hidden">
                        <div
                          className="bg-[#0956fc] h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Founding vs Career Breakdown */}
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold pt-1 border-t border-slate-200/50">
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Gift className="w-2.5 h-2.5" /> Founding:{" "}
                          {course.founding}
                        </span>
                        <span className="flex items-center gap-1 text-purple-700">
                          <Rocket className="w-2.5 h-2.5" /> Career:{" "}
                          {course.career}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Table Toolbar & Filters ── */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, email, ID, phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0956fc]/20 focus:border-[#0956fc] transition-all font-medium"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filters & Actions */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0956fc]/20 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                {/* Program Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0956fc]/20 cursor-pointer"
                >
                  <option value="all">All Programs</option>
                  <option value="founding">Founding Batch</option>
                  <option value="career">Career Program</option>
                </select>

                {/* Refresh Button */}
                <button
                  onClick={refreshAll}
                  className="p-2.5 text-slate-600 hover:text-[#0956fc] hover:bg-slate-100 rounded-xl transition-all border border-slate-200 cursor-pointer"
                  title="Refresh Table"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bulk Actions Panel */}
            {selectedIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100"
              >
                <span className="text-xs font-bold text-[#0956fc]">
                  {selectedIds.length} application(s) selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkStatus("approved")}
                    disabled={updating}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    Approve Selected
                  </button>
                  <button
                    onClick={() => handleBulkStatus("rejected")}
                    disabled={updating}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    Reject Selected
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    disabled={deleting}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    Delete Selected
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Table Container ── */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80">
                    <th className="px-4 py-3.5 w-10">
                      <input
                        type="checkbox"
                        checked={
                          applications.length > 0 &&
                          selectedIds.length === applications.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-slate-300 text-[#0956fc] focus:ring-[#0956fc] cursor-pointer"
                      />
                    </th>
                    <SortableTh
                      label="App ID"
                      field="app_id"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                    />
                    <SortableTh
                      label="Applicant"
                      field="full_name"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                    />
                    <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                      Courses
                    </th>
                    <SortableTh
                      label="Program"
                      field="program_type"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      className="hidden xl:table-cell"
                    />
                    <SortableTh
                      label="Status"
                      field="status"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                    />
                    <SortableTh
                      label="Submitted"
                      field="created_at"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      className="hidden lg:table-cell"
                    />
                    <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))
                  ) : applications.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-12 text-slate-400 font-medium text-sm"
                      >
                        No applications found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => {
                      const isSelected = selectedIds.includes(app.id);
                      return (
                        <tr
                          key={app.id}
                          className={`hover:bg-blue-50/30 transition-colors ${isSelected ? "bg-blue-50/40" : ""}`}
                        >
                          <td className="px-4 py-3.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectOne(app.id)}
                              className="rounded border-slate-300 text-[#0956fc] focus:ring-[#0956fc] cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <CopyableId id={app.app_id || "N/A"} />
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              {app.photo_url ? (
                                <img
                                  src={app.photo_url}
                                  alt=""
                                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-blue-100 text-[#0956fc] flex items-center justify-center font-bold text-sm">
                                  {app.full_name?.charAt(0) || "S"}
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-slate-900 text-sm">
                                  {app.full_name}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {app.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 hidden lg:table-cell max-w-xs">
                            <p className="text-xs font-medium text-slate-700 truncate">
                              {(app.courses || []).join(", ") || "N/A"}
                            </p>
                          </td>
                          <td className="px-4 py-3.5 hidden xl:table-cell whitespace-nowrap">
                            <ProgramTypeBadge type={app.program_type} />
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <StatusBadge status={app.status} />
                          </td>
                          <td className="px-4 py-3.5 hidden lg:table-cell whitespace-nowrap text-xs text-slate-500 font-medium">
                            {formatDate(app.created_at)}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="p-1.5 text-slate-400 hover:text-[#0956fc] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(app)}
                                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openAdmitCard(app)}
                                className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                                title="Print Admit Card"
                              >
                                <Printer className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(app.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">
                  Showing{" "}
                  <span className="font-bold">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold">
                    {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
                  </span>{" "}
                  of <span className="font-bold">{totalCount}</span> results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-bold text-slate-700 px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Detail Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedApp && !showAdmitModal && !showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-100 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                {selectedApp.photo_url ? (
                  <img
                    src={selectedApp.photo_url}
                    alt=""
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0956fc]"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#0956fc] flex items-center justify-center font-black text-2xl">
                    {selectedApp.full_name?.charAt(0) || "S"}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {selectedApp.full_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <CopyableId id={selectedApp.app_id || "N/A"} />
                    <ProgramTypeBadge type={selectedApp.program_type} />
                    <StatusBadge status={selectedApp.status} />
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 py-6 space-y-6 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 font-bold text-xs uppercase block">
                      Father Name
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {selectedApp.father_name || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-xs uppercase block">
                      Gender
                    </span>
                    <span className="text-slate-800 font-semibold capitalize">
                      {selectedApp.gender || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-xs uppercase block">
                      Date of Birth
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {selectedApp.dob || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-xs uppercase block">
                      City
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {selectedApp.city || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-xs uppercase block">
                      Phone
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {selectedApp.phone || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-xs uppercase block">
                      Email
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {selectedApp.email || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-slate-400 font-bold text-xs uppercase block mb-1">
                    Address
                  </span>
                  <p className="text-slate-800 font-medium">
                    {selectedApp.address || "N/A"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 font-bold text-xs uppercase block">
                      Qualification
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {selectedApp.qualification || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-xs uppercase block">
                      Institute
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {selectedApp.institute || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-slate-400 font-bold text-xs uppercase block mb-2">
                    Applied Courses
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(selectedApp.courses || []).map((c, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-[#0956fc] border border-blue-100 rounded-lg font-bold text-xs"
                      >
                        {c}
                      </span>
                    ))}
                    {selectedApp.custom_course && (
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg font-bold text-xs">
                        Custom: {selectedApp.custom_course}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Action buttons inside Modal */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => openAdmitCard(selectedApp)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-xl font-bold text-xs hover:bg-purple-100 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Admit Card
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleSingleStatusUpdate(selectedApp.id, "approved")
                    }
                    disabled={updating}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleSingleStatusUpdate(selectedApp.id, "rejected")
                    }
                    disabled={updating}
                    className="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold text-xs hover:bg-rose-700 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Edit Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-100 shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-extrabold text-slate-900 mb-4">
                Edit Application
              </h3>

              <div className="overflow-y-auto flex-1 space-y-4 pr-1">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.full_name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, full_name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0956fc]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Father Name
                  </label>
                  <input
                    type="text"
                    value={editForm.father_name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, father_name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0956fc]/20 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0956fc]/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={editForm.phone || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0956fc]/20 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Program Type
                    </label>
                    <select
                      value={editForm.program_type || "founding"}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          program_type: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#0956fc]/20 focus:outline-none"
                    >
                      <option value="founding">Founding Batch</option>
                      <option value="career">Career Program</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Status
                    </label>
                    <select
                      value={editForm.status || "pending"}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#0956fc]/20 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Courses (comma separated)
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(editForm.courses)
                        ? editForm.courses.join(", ")
                        : editForm.courses || ""
                    }
                    onChange={(e) =>
                      setEditForm({ ...editForm, courses: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0956fc]/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="px-4 py-2 bg-[#0956fc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Admit Card Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {showAdmitModal && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-100 shadow-2xl relative"
            >
              <button
                onClick={() => setShowAdmitModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 print:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              <AdmitCardPreview app={selectedApp} />

              <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
                <button
                  onClick={() => setShowAdmitModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-[#0956fc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Card
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
