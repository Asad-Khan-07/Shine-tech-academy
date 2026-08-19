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
} from "lucide-react";

const ITEMS_PER_PAGE = 10;
const EASE = [0.22, 1, 0.36, 1];

/* ─── Helper Functions ───────────────────────────────────────────── */
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

function StatCard({
  label,
  value,
  icon: Icon,
  color = "blue",
  className = "",
  trend,
  trendLabel,
}) {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    amber: "from-amber-500 to-amber-600",
    emerald: "from-emerald-500 to-emerald-600",
    rose: "from-rose-500 to-rose-600",
    indigo: "from-indigo-500 to-indigo-600",
  };
  const bgMap = {
    blue: "bg-blue-50/80",
    amber: "bg-amber-50/80",
    emerald: "bg-emerald-50/80",
    rose: "bg-rose-50/80",
    indigo: "bg-indigo-50/80",
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

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    today: 0,
  });

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounced(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchDebounced, filterStatus, sortField, sortOrder]);

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
    [filterStatus, searchDebounced],
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
      const [totalRes, pendingRes, approvedRes, rejectedRes, todayRes] =
        await Promise.allSettled([
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
      });
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refreshAll = () => {
    toast.promise(Promise.all([fetchApplications(), fetchStats()]), {
      loading: "Refreshing data...",
      success: "Data refreshed!",
      error: "Refresh failed",
    });
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
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
              className="col-span-2 lg:col-span-1"
            />
          </div>

          {/* ── Filter & Search Toolbar ── */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student name, email, ID, phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0956fc] focus:bg-white transition-all"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0956fc] cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button
                  onClick={refreshAll}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#0956fc] to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            <AnimatePresence>
              {selectedIds.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: reduceMotion ? 0.05 : 0.2,
                    ease: EASE,
                  }}
                  className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 overflow-hidden"
                >
                  <span className="text-xs font-extrabold text-[#0956fc] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    {selectedIds.length} Selected
                  </span>
                  <button
                    onClick={() => handleBulkStatus("approved")}
                    disabled={updating}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Approve All
                  </button>
                  <button
                    onClick={() => handleBulkStatus("rejected")}
                    disabled={updating}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    disabled={deleting}
                    className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => setSelectedIds([])}
                    className="px-3 py-1.5 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors ml-auto cursor-pointer"
                  >
                    Clear Selection
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Table & Cards Content ── */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {loading ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/90 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3.5 text-center">
                        <div className="h-4 w-4 bg-slate-200 rounded"></div>
                      </th>
                      <th className="px-4 py-3.5">
                        <div className="h-4 w-10 bg-slate-200 rounded"></div>
                      </th>
                      <th className="px-4 py-3.5">
                        <div className="h-4 w-32 bg-slate-200 rounded"></div>
                      </th>
                      <th className="px-4 py-3.5 hidden lg:table-cell">
                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                      </th>
                      <th className="px-4 py-3.5 hidden xl:table-cell">
                        <div className="h-4 w-20 bg-slate-200 rounded"></div>
                      </th>
                      <th className="px-4 py-3.5">
                        <div className="h-4 w-16 bg-slate-200 rounded"></div>
                      </th>
                      <th className="px-4 py-3.5 hidden lg:table-cell">
                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                      </th>
                      <th className="px-4 py-3.5 text-center">
                        <div className="h-8 w-8 bg-slate-200 rounded-full mx-auto"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-20 px-4">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-700 font-bold text-base">
                  No Applications Found
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Try adjusting your search criteria or status filters.
                </p>
                {(search || filterStatus !== "all") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setFilterStatus("all");
                    }}
                    className="mt-4 px-4 py-2 text-xs font-bold bg-blue-50 text-[#0956fc] rounded-xl hover:bg-blue-100 transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="overflow-x-auto hidden md:block">
                  <table className="w-full">
                    <thead className="bg-slate-50/90 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3.5 text-center">
                          <button
                            onClick={handleSelectAll}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {selectedIds.length === applications.length &&
                            applications.length > 0 ? (
                              <CheckSquare className="w-4 h-4 text-[#0956fc]" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          ID
                        </th>
                        <SortableTh
                          label="Student Info"
                          field="full_name"
                          sortField={sortField}
                          sortOrder={sortOrder}
                          onSort={handleSort}
                        />
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                          Contact
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                          Course
                        </th>
                        <SortableTh
                          label="Status"
                          field="status"
                          sortField={sortField}
                          sortOrder={sortOrder}
                          onSort={handleSort}
                        />
                        <SortableTh
                          label="Submitted At"
                          field="created_at"
                          sortField={sortField}
                          sortOrder={sortOrder}
                          onSort={handleSort}
                          className="hidden lg:table-cell"
                        />
                        <th className="text-center px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app) => (
                        <motion.tr
                          key={app.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15 }}
                          className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors group"
                        >
                          <td className="px-4 py-3.5 text-center">
                            <button
                              onClick={() => handleSelectOne(app.id)}
                              className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {selectedIds.includes(app.id) ? (
                                <CheckSquare className="w-4 h-4 text-[#0956fc]" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3.5">
                            <CopyableId id={app.app_id || "N/A"} />
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              {app.photo_url ? (
                                <img
                                  src={app.photo_url}
                                  alt={app.full_name}
                                  className="w-9 h-9 rounded-full object-cover border border-slate-200/80 shadow-sm"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-200">
                                  {app.full_name?.charAt(0) || "?"}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-bold text-slate-800">
                                  {app.full_name}
                                </p>
                                <p className="text-xs text-slate-400 font-medium">
                                  {app.father_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 hidden lg:table-cell">
                            <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />{" "}
                              {app.email}
                            </p>
                            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />{" "}
                              {app.phone}
                            </p>
                          </td>
                          <td className="px-4 py-3.5 hidden xl:table-cell">
                            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60 inline-block truncate max-w-[150px]">
                              {app.courses?.[0] || "N/A"}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <StatusBadge status={app.status || "pending"} />
                          </td>
                          <td className="px-4 py-3.5 hidden lg:table-cell">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-400" />{" "}
                                {formatDate(app.created_at)}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3 text-[#0956fc]" />{" "}
                                {formatTime(app.created_at)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="p-2 text-[#0956fc] hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(app)}
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openAdmitCard(app)}
                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                                title="Admit Card"
                              >
                                <CreditCard className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(app.id)}
                                disabled={deleting}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View Cards */}
                <div className="md:hidden divide-y divide-slate-100">
                  {applications.map((app) => (
                    <div key={app.id} className="p-4 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleSelectOne(app.id)}
                          className="text-slate-400 hover:text-slate-600 mt-1 flex-shrink-0 cursor-pointer"
                        >
                          {selectedIds.includes(app.id) ? (
                            <CheckSquare className="w-4 h-4 text-[#0956fc]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                        {app.photo_url ? (
                          <img
                            src={app.photo_url}
                            alt={app.full_name}
                            className="w-11 h-11 rounded-full object-cover border border-slate-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm flex-shrink-0 border border-slate-200">
                            {app.full_name?.charAt(0) || "?"}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-extrabold text-slate-900 truncate">
                            {app.full_name}
                          </p>
                          <CopyableId id={app.app_id || "N/A"} />
                        </div>
                        <StatusBadge status={app.status || "pending"} />
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-xs text-slate-600 pl-[26px]">
                        <p className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />{" "}
                          {app.email}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />{" "}
                          {app.phone}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />{" "}
                          {app.courses?.[0] || "N/A"}
                        </p>
                        <p className="flex items-center gap-1.5 font-semibold text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-[#0956fc] flex-shrink-0" />
                          {formatDate(app.created_at)} at{" "}
                          {formatTime(app.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pl-[26px] pt-1">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#0956fc] bg-blue-50 rounded-xl cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                        <button
                          onClick={() => handleEdit(app)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-amber-600 bg-amber-50 rounded-xl cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => openAdmitCard(app)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-xl cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" /> Card
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-2 text-rose-600 bg-rose-50 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-slate-500 font-semibold">
                    Showing{" "}
                    <span className="font-bold text-slate-800">
                      {Math.min(
                        (currentPage - 1) * ITEMS_PER_PAGE + 1,
                        totalCount,
                      )}
                    </span>{" "}
                    to{" "}
                    <span className="font-bold text-slate-800">
                      {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-slate-800">
                      {totalCount}
                    </span>{" "}
                    submissions
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-sm"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-black text-[#0956fc] px-2 bg-blue-50 py-1 rounded-lg border border-blue-100">
                      Page {currentPage} of {totalPages || 1}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage >= totalPages}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── MODALS ── (View, Edit, AdmitCard) ── */}
      <AnimatePresence>
        {selectedApp && !showAdmitModal && !showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-100"
            >
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                {selectedApp.photo_url ? (
                  <img
                    src={selectedApp.photo_url}
                    alt={selectedApp.full_name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0956fc] shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-[#0956fc] flex items-center justify-center font-black text-2xl border border-blue-100">
                    {selectedApp.full_name?.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {selectedApp.full_name}
                  </h3>
                  <CopyableId id={selectedApp.app_id || "N/A"} />
                </div>
                <div className="ml-auto">
                  <StatusBadge status={selectedApp.status} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 text-sm">
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    Father Name
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedApp.father_name || "N/A"}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    Gender
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedApp.gender || "N/A"}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    DOB
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedApp.dob || "N/A"}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    Submission
                  </span>
                  <span className="font-bold text-[#0956fc]">
                    {formatDate(selectedApp.created_at)} at{" "}
                    {formatTime(selectedApp.created_at)}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    Email
                  </span>
                  <span className="font-bold text-slate-800 truncate block">
                    {selectedApp.email || "N/A"}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    Phone
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedApp.phone || "N/A"}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    Qualification
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedApp.qualification || "N/A"}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    City
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedApp.city || "N/A"}
                  </span>
                </div>
                <div className="col-span-1 sm:col-span-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    Institute
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedApp.institute || "N/A"}
                  </span>
                </div>
                <div className="col-span-1 sm:col-span-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">
                    Address
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedApp.address || "N/A"}
                  </span>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="text-slate-400 block text-xs font-semibold uppercase mb-1.5">
                    Applied Courses
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(selectedApp.courses || []).map((c, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-[#0956fc] border border-blue-100 px-3 py-1 rounded-xl text-xs font-bold"
                      >
                        {c}
                      </span>
                    ))}
                    {selectedApp.custom_course && (
                      <span className="bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1 rounded-xl text-xs font-bold">
                        {selectedApp.custom_course}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-500 uppercase">
                    Set Status:
                  </span>
                  <button
                    onClick={() =>
                      handleSingleStatusUpdate(selectedApp.id, "approved")
                    }
                    disabled={updating}
                    className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleSingleStatusUpdate(selectedApp.id, "rejected")
                    }
                    disabled={updating}
                    className="px-3.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      handleSingleStatusUpdate(selectedApp.id, "pending")
                    }
                    disabled={updating}
                    className="px-3.5 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    Pending
                  </button>
                </div>
                <button
                  onClick={() => openAdmitCard(selectedApp)}
                  className="px-5 py-2.5 bg-[#0956fc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  {" "}
                  <CreditCard className="w-4 h-4" /> Admit Card{" "}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-100"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-extrabold text-slate-900 mb-5">
                ✏️ Edit Application
              </h3>
              <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.full_name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, full_name: e.target.value })
                    }
                    className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0956fc]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Father Name
                  </label>
                  <input
                    type="text"
                    value={editForm.father_name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, father_name: e.target.value })
                    }
                    className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0956fc]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0956fc]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={editForm.phone || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0956fc]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">
                      Qualification
                    </label>
                    <input
                      type="text"
                      value={editForm.qualification || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          qualification: e.target.value,
                        })
                      }
                      className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0956fc]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">
                      City
                    </label>
                    <input
                      type="text"
                      value={editForm.city || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, city: e.target.value })
                      }
                      className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0956fc]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">
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
                    className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0956fc]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">
                    Status
                  </label>
                  <select
                    value={editForm.status || "pending"}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                    className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0956fc]"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="px-6 py-2.5 text-xs font-extrabold bg-[#0956fc] text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2 shadow-md"
                >
                  {updating && <Loader className="w-4 h-4 animate-spin" />} Save
                  Updates
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admit Card Modal */}
      <AnimatePresence>
        {showAdmitModal && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-100"
            >
              <button
                onClick={() => setShowAdmitModal(false)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 cursor-pointer print:hidden"
              >
                <X className="w-5 h-5" />
              </button>
              <AdmitCardPreview app={selectedApp} />
              <div className="mt-6 flex justify-end gap-3 print:hidden">
                <button
                  onClick={() => setShowAdmitModal(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 text-xs font-extrabold bg-[#0956fc] text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
