'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getEvents, getAdminStats, deleteEvent, authenticateAdmin, getBookings, updateAdminPassword, sendPasswordReset, deleteBooking } from '@/app/actions/admin';
import { getInterests } from '@/app/actions/interest';
import CreateEventForm from '@/components/admin/CreateEventForm';
import {
  Shield,
  Eye,
  EyeOff,
  Plus,
  Edit3,
  Trash2,
  Save,
  Calendar,
  Users,
  BarChart2,
  Settings,
  Zap,
  MapPin,
  Key,
  CreditCard,
  Mail
} from 'lucide-react';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/lib/utils';

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  
  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'applicants' | 'waitlist' | 'settings'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [managedEvents, setManagedEvents] = useState<Record<string, unknown>[]>([]);
  const [interests, setInterests] = useState<Record<string, unknown>[]>([]);
  const [bookings, setBookings] = useState<Record<string, unknown>[]>([]);
  const [stats, setStats] = useState<Record<string, unknown>>({
    totalEvents: 0,
    totalSpots: 0,
    spotsLeft: 0,
    spotsTaken: 0,
    totalBookings: 0,
    revenue: 0
  });

  // Settings state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const loadData = async () => {
    try {
      const fetchedEvents = await getEvents();
      const fetchedStats = await getAdminStats();
      const fetchedInterests = await getInterests();
      const fetchedBookings = await getBookings();
      setManagedEvents(fetchedEvents);
      setStats(fetchedStats);
      setInterests(fetchedInterests);
      setBookings(fetchedBookings);
    } catch (e) {
      toast.error('Failed to load data');
    }
  };

  const handleLogin = async () => {
    toast.loading('Verifying credentials...', { id: 'admin-login' });
    const isAuthenticated = await authenticateAdmin(username, password);
    
    if (isAuthenticated) {
      toast.loading('Loading dashboard...', { id: 'admin-login' });
      await loadData();
      toast.dismiss('admin-login');
      setUnlocked(true);
      toast.success('Welcome back, admin!');
    } else {
      toast.dismiss('admin-login');
      toast.error('Incorrect username or password');
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotUsername) return toast.error('Please enter your username');
    toast.loading('Sending reset link...', { id: 'admin-forgot' });
    const res = await sendPasswordReset(forgotUsername);
    toast.dismiss('admin-forgot');
    if (res.success) {
      toast.success(res.message);
      setShowForgot(false);
    } else {
      toast.error(res.message);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) return toast.error('Please fill all fields');
    toast.loading('Updating password...', { id: 'admin-pw' });
    const res = await updateAdminPassword(username, oldPassword, newPassword);
    toast.dismiss('admin-pw');
    if (res.success) {
      toast.success(res.message);
      setOldPassword('');
      setNewPassword('');
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        toast.success('Event deleted');
        loadData(); // refresh
      } catch (e) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (confirm('Are you sure you want to delete this applicant? This will also release their spots.')) {
      try {
        toast.loading('Deleting booking...', { id: 'del-booking' });
        const res = await deleteBooking(id);
        if (res.success) {
          toast.success('Applicant deleted', { id: 'del-booking' });
          loadData(); // refresh bookings and stats
        } else {
          toast.error(res.error || 'Failed to delete', { id: 'del-booking' });
        }
      } catch (e) {
        toast.error('An error occurred', { id: 'del-booking' });
      }
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#070711] flex items-center justify-center px-4">
        <div className="max-w-sm w-full animate-scale-in">
          {/* Lock icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Shield size={28} className="text-indigo-400" />
          </div>
          <h1
            className="text-2xl font-bold text-white text-center mb-2"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Admin Access
          </h1>
          <p className="text-white/40 text-sm text-center mb-8">
            {showForgot ? 'Reset your password' : 'Enter your credentials to manage events'}
          </p>

          <div className="glass border border-white/10 rounded-2xl p-6">
            {!showForgot ? (
              <>
                <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">
                  Username
                </label>
                <div className="relative mb-4">
                  <input
                    id="admin-username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">
                  Password
                </label>
                <div className="relative mb-6">
                  <input
                    id="admin-password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="input-field pr-10"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <button
                  id="admin-login-btn"
                  onClick={handleLogin}
                  className="btn-primary w-full py-3.5 rounded-xl text-sm mb-4"
                >
                  <span className="relative z-10">Enter Admin Panel</span>
                </button>
                <div className="text-center">
                  <button onClick={() => setShowForgot(true)} className="text-indigo-400 text-xs hover:text-indigo-300">
                    Forgot Password?
                  </button>
                </div>
              </>
            ) : (
              <>
                <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">
                  Username
                </label>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={forgotUsername}
                    onChange={(e) => setForgotUsername(e.target.value)}
                    className="input-field"
                  />
                </div>
                <button
                  onClick={handleForgotPassword}
                  className="btn-primary w-full py-3.5 rounded-xl text-sm mb-4"
                >
                  <span className="relative z-10">Send Reset Link</span>
                </button>
                <div className="text-center">
                  <button onClick={() => setShowForgot(false)} className="text-white/40 text-xs hover:text-white/70">
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070711] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Admin header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16} className="text-indigo-400" />
              <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">Admin Panel</span>
            </div>
            <h1
              className="text-3xl font-bold text-white"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              NEXUS Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 glass border border-emerald-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">Live Database</span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 glass border border-white/8 rounded-xl mb-8 w-fit overflow-x-auto max-w-full">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart2 },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'applicants', label: 'Applicants', icon: CreditCard },
            { id: 'waitlist', label: 'Waitlist', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`admin-tab-${id}`}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-indigo-600 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {/* ---- OVERVIEW TAB ---- */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { label: 'Total Events', value: stats.totalEvents as number, color: 'text-white' },
                { label: 'Total Spots', value: stats.totalSpots as number, color: 'text-white' },
                { label: 'Spots Booked', value: stats.spotsTaken as number, color: 'text-indigo-400' },
                { label: 'Bookings', value: stats.totalBookings as number, color: 'text-violet-400' },
                { label: 'Revenue', value: `₹${stats.revenue}`, color: 'text-emerald-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass border border-white/8 rounded-2xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{label}</p>
                  <p className={`text-3xl font-bold ${color}`} style={{ fontFamily: 'var(--font-syne)' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Events summary */}
            <div className="glass border border-white/8 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/8">
                <h2 className="font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>Events Summary</h2>
              </div>
              <div className="divide-y divide-white/5">
                {managedEvents.map((event: any) => {
                  const total = event.dates.reduce((s: number, d: { spotsTotal: number; spotsLeft: number }) => s + d.spotsTotal, 0);
                  const left = event.dates.reduce((s: number, d: { spotsTotal: number; spotsLeft: number }) => s + d.spotsLeft, 0);
                  const taken = total - left;
                  return (
                    <div key={event._id} className="px-5 py-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{event.title}</p>
                        <p className="text-white/40 text-xs">{event.category} · {event.dates.length} date{event.dates.length > 1 ? 's' : ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm font-semibold">{taken}/{total}</p>
                        <p className="text-white/40 text-xs">booked</p>
                      </div>
                      <div className="w-24">
                        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${total > 0 ? (taken / total) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ---- EVENTS TAB ---- */}
        {activeTab === 'events' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-syne)' }}>Manage Events</h2>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field w-full sm:w-64"
                />
                <button 
                  onClick={() => { setEditingEvent(null); setShowCreateModal(true); }} 
                  className="btn-primary text-sm px-4 py-2.5 rounded-xl inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Plus size={15} /> New Event
                  </span>
                </button>
              </div>
            </div>

            {managedEvents
              .filter((e: any) => e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.category.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((event: any) => (
              <div key={event._id} className="glass border border-white/8 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      fill
                      sizes="80px"
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-white text-sm mb-0.5">{event.title}</p>
                        <p className="text-white/40 text-xs mb-2">{event.category} · Min age {event.minAge}+</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => { setEditingEvent(event); setShowCreateModal(true); }} className="p-2 glass border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-indigo-500/40 transition-all">
                          <Edit3 size={13} />
                        </button>
                        <button onClick={() => handleDelete(event._id)} className="p-2 glass border border-white/10 rounded-lg text-white/50 hover:text-red-400 hover:border-red-500/40 transition-all">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    {/* Dates */}
                    <div className="flex flex-wrap gap-2">
                      {event.dates.map((d: any) => (
                        <div
                          key={d.id}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/4 border border-white/8 text-xs text-white/60"
                        >
                          <Calendar size={10} className="text-indigo-400" />
                          {d.label.split(',')[0]}
                          <span className={`font-semibold ${d.spotsLeft <= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {d.spotsLeft <= 0 ? 'Full' : `${d.spotsLeft} left`}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Pricing */}
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      {event.earlyBird?.active && (
                        <span className="flex items-center gap-1 text-indigo-400">
                          <Zap size={10} /> Early bird active
                        </span>
                      )}
                      <span className="text-white/35">
                        ₹{event.pricing.solo}–₹{event.pricing.solo}/person
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---- APPLICANTS TAB ---- */}
        {activeTab === 'applicants' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-syne)' }}>Applicants & Bookings</h2>
                <p className="text-white/40 text-sm">Full details of people who applied for your events</p>
              </div>
              <div className="px-3 py-1 rounded-full glass border border-white/10 text-xs text-white/60">
                {bookings.length} Bookings
              </div>
            </div>

            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="p-8 text-center text-white/30 border border-dashed border-white/10 rounded-2xl">
                  No applicants yet.
                </div>
              ) : (
                bookings.map((booking: any) => (
                  <div key={booking._id} className="glass border border-white/8 rounded-2xl p-5 overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-white text-base">{booking.eventSlug.replace(/-/g, ' ')}</p>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${booking.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-white/40 text-xs">Primary Contact: {booking.contactEmail} · {booking.contactPhone}</p>
                      </div>
                      <div className="text-left md:text-right flex flex-col md:items-end">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-white text-lg font-bold" style={{ fontFamily: 'var(--font-syne)' }}>{formatCurrency(booking.totalAmount)}</p>
                          <button onClick={() => handleDeleteBooking(booking._id)} className="p-1.5 glass border border-white/10 rounded-lg text-white/50 hover:text-red-400 hover:border-red-500/40 transition-all" aria-label="Delete applicant">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-white/40 text-xs">Group Size: {booking.groupSize} ({booking.groupType})</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                      <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-3">Attendee Details</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {booking.attendees.map((attendee: any, idx: number) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{attendee.name} <span className="text-white/30 font-normal">({attendee.age} yrs)</span></p>
                              <p className="text-white/40 text-xs">Email: {attendee.email || 'N/A'}</p>
                              <p className="text-white/40 text-xs">Phone: {attendee.phone || 'N/A'}</p>
                              {attendee.emergencyContact && (
                                <p className="text-amber-400/70 text-xs mt-0.5">Emergency: {attendee.emergencyContact}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ---- WAITLIST TAB ---- */}
        {activeTab === 'waitlist' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-syne)' }}>Interested Users</h2>
                <p className="text-white/40 text-sm">Full details of activity requests from your community</p>
              </div>
              <div className="px-3 py-1 rounded-full glass border border-white/10 text-xs text-white/60">
                {interests.length} Total Requests
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {interests.length === 0 ? (
                <div className="col-span-full p-8 text-center text-white/30 border border-dashed border-white/10 rounded-2xl">
                  No interest requests yet.
                </div>
              ) : (
                interests.map((req: any) => (
                  <div key={req._id} className="glass border border-white/8 rounded-2xl p-5 hover:border-indigo-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-white text-sm">{req.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Mail size={12} className="text-white/40" />
                          <p className="text-white/50 text-xs">{req.email}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <CreditCard size={12} className="text-white/40" />
                          <p className="text-white/50 text-xs">{req.phone}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${req.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="space-y-2 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <MapPin size={14} className="text-indigo-400" /> {req.activity}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Calendar size={14} className="text-emerald-400" /> {req.preferredDate} at {req.preferredTime}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ---- SETTINGS TAB ---- */}
        {activeTab === 'settings' && (
          <div className="max-w-lg space-y-8 animate-fade-in">
            <div>
              <h2 className="font-bold text-white text-lg mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Club Settings</h2>

              <div className="space-y-4 mb-6">
                {[
                  { label: 'Club Name', placeholder: 'BEYOND WORK', id: 'setting-name' },
                  { label: 'UPI ID', placeholder: 'nexusclub@upi', id: 'setting-upi' },
                  { label: 'Contact Email', placeholder: 'hello@nexusclub.in', id: 'setting-email' },
                  { label: 'WhatsApp Number', placeholder: '+91 98765 43210', id: 'setting-whatsapp' },
                ].map(({ label, placeholder, id }) => (
                  <div key={id}>
                    <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">{label}</label>
                    <input
                      id={id}
                      type="text"
                      placeholder={placeholder}
                      className="input-field"
                    />
                  </div>
                ))}
              </div>

              <button
                id="save-settings-btn"
                onClick={() => toast.success('Settings saved!')}
                className="btn-primary px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Save size={15} /> Save Settings
                </span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-syne)' }}>
                <Key size={18} className="text-indigo-400" /> Admin Security
              </h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CREATE EVENT MODAL OVERLAY */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] animate-scale-in">
            <CreateEventForm 
              initialData={editingEvent}
              onCancel={() => {
                setShowCreateModal(false);
                setEditingEvent(null);
              }}
              onSuccess={() => {
                setShowCreateModal(false);
                setEditingEvent(null);
                loadData();
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
