import React, { useState, useEffect } from 'react';
import api from '../services/api';
import StatCard from '../components/common/StatCard';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Users,
  Building2,
  UtensilsCrossed,
  Truck,
  Heart,
  BarChart3,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Activity,
  Layers,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'users', 'listings', 'logs'

  // User search & filter
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [overviewRes, usersRes, listingsRes, logsRes] = await Promise.all([
        api.get('/analytics/overview'),
        api.get('/users?limit=50'),
        api.get('/listings?status=all&limit=50'),
        api.get('/analytics/activity-logs?limit=40'),
      ]);

      if (overviewRes.success) setStats(overviewRes.stats);
      if (usersRes.success) setUsers(usersRes.users || []);
      if (listingsRes.success) setListings(listingsRes.listings || []);
      if (logsRes.success) setActivityLogs(logsRes.logs || []);
    } catch (err) {
      console.warn('Admin data load failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVerifyNgo = async (userId, newStatus) => {
    try {
      const res = await api.put(`/users/${userId}/verify-ngo`, { verificationStatus: newStatus });
      if (res.success) {
        alert(`NGO status updated to: ${newStatus}`);
        loadData();
      }
    } catch (err) {
      alert(err.message || 'Failed to verify NGO');
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const res = await api.put(`/users/${userId}/status`, { isActive: !currentStatus });
      if (res.success) {
        alert(`User status changed to ${!currentStatus ? 'Active' : 'Deactivated'}`);
        loadData();
      }
    } catch (err) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to remove this food listing from the platform?')) return;
    try {
      const res = await api.delete(`/listings/${listingId}`);
      if (res.success) {
        alert('Listing removed successfully.');
        loadData();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete listing');
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.organizationName && u.organizationName.toLowerCase().includes(userSearch.toLowerCase()));
    const matchesRole = userRoleFilter ? u.role === userRoleFilter : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="section-py">
      <div className="container">
        {/* Admin Header */}
        <div
          className="card card-glass"
          style={{
            padding: '2rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            borderLeft: '5px solid var(--rose-500)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(244, 63, 94, 0.15)',
                color: 'var(--rose-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={32} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Admin Control Tower</h1>
                <span className="badge badge-rose">Master Moderator</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Platform governance, NGO verification verification, listings moderation, and system audit trail.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={loadData} className="btn btn-secondary btn-sm">
              <Activity size={15} /> Refresh Data
            </button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          <StatCard
            title="Total Registered Donors"
            value={stats?.totalDonors || 0}
            subtitle="Commercial & Individual"
            icon={Building2}
            color="emerald"
          />
          <StatCard
            title="Verified NGOs"
            value={stats?.verifiedNgos || 0}
            subtitle="Out of registered NGO hubs"
            icon={ShieldCheck}
            color="cyan"
          />
          <StatCard
            title="Total Food Rescued"
            value={stats?.totalFoodKg || 5000}
            suffix=" kg"
            subtitle="Meals served: ~12,500"
            icon={Heart}
            color="indigo"
          />
          <StatCard
            title="Completed Pickups"
            value={stats?.completedPickups || 0}
            subtitle="Verified food deliveries"
            icon={Truck}
            color="amber"
          />
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '2px solid var(--border-subtle)',
            marginBottom: '1.75rem',
          }}
        >
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === 'overview' ? 'var(--rose-500)' : 'var(--text-muted)',
              borderBottom: activeTab === 'overview' ? '3px solid var(--rose-500)' : '3px solid transparent',
              marginBottom: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <BarChart3 size={17} /> Category Analytics
          </button>

          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === 'users' ? 'var(--rose-500)' : 'var(--text-muted)',
              borderBottom: activeTab === 'users' ? '3px solid var(--rose-500)' : '3px solid transparent',
              marginBottom: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Users size={17} /> User Management ({users.length})
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            style={{
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === 'listings' ? 'var(--rose-500)' : 'var(--text-muted)',
              borderBottom: activeTab === 'listings' ? '3px solid var(--rose-500)' : '3px solid transparent',
              marginBottom: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Layers size={17} /> Listing Moderation ({listings.length})
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            style={{
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === 'logs' ? 'var(--rose-500)' : 'var(--text-muted)',
              borderBottom: activeTab === 'logs' ? '3px solid var(--rose-500)' : '3px solid transparent',
              marginBottom: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Activity size={17} /> Audit Logs ({activityLogs.length})
          </button>
        </div>

        {/* TAB 1: CATEGORY ANALYTICS */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Food Donation Volume by Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {stats?.categoryBreakdown?.map((cat, i) => (
                  <div key={i}>
                    <div className="flex-between" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600 }}>{cat._id || 'Uncategorized'}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{cat.count} listings ({cat.totalQty} units)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-muted)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${Math.min(100, (cat.count / (listings.length || 1)) * 100)}%`,
                          background: 'linear-gradient(90deg, var(--primary-500), var(--accent-500))',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Donation Lifecycle Status Distribution
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {stats?.statusBreakdown?.map((st, i) => (
                  <div key={i} className="flex-between" style={{ padding: '0.6rem 0.85rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontWeight: 700 }}>{st._id}</span>
                    <span className="badge badge-indigo">{st.count} listings</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="card">
            {/* Filters */}
            <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: '1 1 250px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="Search user name, email, org..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>

              <select
                className="form-control"
                style={{ width: '180px' }}
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="donor">Donors</option>
                <option value="receiver">NGOs / Receivers</option>
                <option value="admin">Administrators</option>
              </select>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>User / Organization</th>
                    <th style={{ padding: '0.75rem' }}>Role</th>
                    <th style={{ padding: '0.75rem' }}>Verification</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u._id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 700 }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {u.organizationName || u.email}
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className={`badge badge-${u.role === 'admin' ? 'rose' : u.role === 'donor' ? 'emerald' : 'indigo'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        {u.role === 'receiver' ? (
                          u.isVerified ? (
                            <span className="badge badge-emerald">✓ Verified</span>
                          ) : (
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                              <button
                                onClick={() => handleVerifyNgo(u._id, 'verified')}
                                className="btn btn-primary btn-sm"
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                              >
                                Approve NGO
                              </button>
                            </div>
                          )
                        ) : (
                          <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Auto-verified</span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className={`badge ${u.isActive ? 'badge-emerald' : 'badge-rose'}`}>
                          {u.isActive ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleToggleUserStatus(u._id, u.isActive)}
                          className={`btn ${u.isActive ? 'btn-danger' : 'btn-primary'} btn-sm`}
                          style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}
                        >
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LISTING MODERATION */}
        {activeTab === 'listings' && (
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
              All Platform Food Listings
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>Listing Title</th>
                    <th style={{ padding: '0.75rem' }}>Donor</th>
                    <th style={{ padding: '0.75rem' }}>Quantity</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Moderation</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l) => (
                    <tr key={l._id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 700 }}>{l.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l.category} • {l.dietaryType}</div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>{l.donorOrg || l.donorName}</td>
                      <td style={{ padding: '0.75rem' }}>{l.quantity} {l.quantityUnit}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge badge-emerald">{l.status}</span>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteListing(l._id)}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT ACTIVITY LOGS */}
        {activeTab === 'logs' && (
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Chronological Audit Trail
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {activityLogs.map((log) => (
                <div
                  key={log._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-main)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                  }}
                >
                  <div>
                    <span className="badge badge-indigo" style={{ fontSize: '0.7rem', marginRight: '0.5rem' }}>
                      {log.action}
                    </span>
                    <span style={{ color: 'var(--text-main)' }}>{log.description}</span>
                  </div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
