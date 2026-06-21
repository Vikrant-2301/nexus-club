'use client';

import { useState } from 'react';
import { createEvent, updateEvent } from '@/app/actions/admin';
import toast from 'react-hot-toast';
import { Image as ImageIcon, MapPin, Calendar, Users, DollarSign, UploadCloud, Plus, Trash, List, AlertTriangle, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MapPicker = dynamic(() => import('./MapPicker'), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full rounded-xl bg-white/5 animate-pulse flex items-center justify-center text-white/50 border border-white/10">Loading Map...</div>
});

export default function CreateEventForm({ onCancel, onSuccess, initialData }: { onCancel: () => void, onSuccess: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Default detailed running event per user request
  const [formData, setFormData] = useState<any>(initialData || {
    slug: '',
    title: 'Midnight City Marathon',
    tagline: 'Experience the city lights like never before',
    category: 'SPORTS',
    description: 'Join thousands of runners for an unforgettable midnight marathon through the heart of the city. Enjoy traffic-free roads, illuminated landmarks, and an electric atmosphere. This event is perfect for both seasoned marathoners and first-timers looking for a unique experience.',
    coverImage: '',
    images: [],
    dates: [
      { id: Date.now().toString(), label: 'Oct 24, Saturday Night', date: '2026-10-24', time: '11:00 PM', location: 'Central Plaza', spotsTotal: 1000, spotsLeft: 1000 }
    ],
    minAge: 16,
    pricing: { solo: 999, duo: 1800, group3: 2500, group4plus: 3000 },
    highlights: ['Traffic-free illuminated route', 'Exclusive Neon Finisher Medal', 'Live DJ at the finish line', 'Midnight breakfast buffet'],
    schedule: [
      { time: '22:00', activity: 'Bib Collection & Assembly' },
      { time: '22:45', activity: 'Zumba Warmup Session' },
      { time: '23:00', activity: 'Race Flag Off' },
      { time: '01:00', activity: 'Midnight Breakfast & DJ' }
    ],
    whatToBring: ['Comfortable running shoes', 'Valid ID proof', 'Hydration pack (optional)'],
    rules: ['No littering on the route', 'Follow volunteer instructions at all times', 'Medical clearance recommended'],
    mapLocation: { lat: 28.6139, lng: 77.2090, address: 'Central Plaza, New Delhi', landmark: 'North Gate' },
    organizer: {
      name: 'Beyond Work Official',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
      role: 'Event Organizer',
      events: 42
    }
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5000000) {
      return toast.error("File is too large! Max 5MB.");
    }

    setUploading(true);
    toast.loading("Uploading image...", { id: 'local-upload' });

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      
      const json = await res.json();
      
      if (json.success) {
        setFormData({ ...formData, coverImage: json.url });
        toast.success("Image uploaded!", { id: 'local-upload' });
      } else {
        throw new Error(json.error);
      }
    } catch (error) {
      toast.error("Upload failed!", { id: 'local-upload' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.coverImage) return toast.error('Cover image is required!');
    if (formData.dates.length === 0) return toast.error('Add at least one date!');
    
    setLoading(true);
    toast.loading('Creating event...', { id: 'create-event' });

    // Generate unique slug from title if empty
    // Injecting a dummy upiId to bypass the cached Mongoose schema requiring it
    let submitData = { ...formData, upiId: 'razorpay' };
    if (!submitData.slug) {
      const baseSlug = submitData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      submitData.slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const res = initialData 
      ? await updateEvent(initialData._id, submitData)
      : await createEvent(submitData);
      
    if (res.success) {
      toast.success(`Event ${initialData ? 'updated' : 'created'} successfully!`, { id: 'create-event' });
      onSuccess();
    } else {
      toast.error(res.error || `Failed to ${initialData ? 'update' : 'create'} event`, { id: 'create-event' });
    }
    setLoading(false);
  };

  const addDate = () => {
    setFormData({
      ...formData,
      dates: [...formData.dates, { id: Date.now().toString(), label: '', date: '', time: '', location: '', spotsTotal: 20, spotsLeft: 20 }]
    });
  };

  const updateDate = (index: number, field: string, value: any) => {
    const newDates = [...formData.dates];
    newDates[index] = { ...newDates[index], [field]: value };
    setFormData({ ...formData, dates: newDates });
  };

  const addArrayItem = (field: string, defaultValue: any = '') => {
    setFormData({ ...formData, [field]: [...formData[field], defaultValue] });
  };

  const updateArrayItem = (field: string, index: number, value: any) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArr = formData[field].filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, [field]: newArr });
  };

  const addScheduleItem = () => {
    setFormData({ ...formData, schedule: [...formData.schedule, { time: '', activity: '' }] });
  };

  const updateScheduleItem = (index: number, key: 'time' | 'activity', value: string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [key]: value };
    setFormData({ ...formData, schedule: newSchedule });
  };

  const removeScheduleItem = (index: number) => {
    const newSchedule = formData.schedule.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, schedule: newSchedule });
  };

  return (
    <div className="glass border border-white/10 rounded-2xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
        {initialData ? 'Edit Event' : 'Create New Event'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <ImageIcon size={16} /> Basic Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/40 block mb-1">Title</label>
              <input required type="text" className="input-field w-full" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="E.g., Moonlight Trek" />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1">Category</label>
              <select className="input-field w-full" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="TREK">Trek</option>
                <option value="CAMPING">Camping</option>
                <option value="ADVENTURE">Adventure</option>
                <option value="SPORTS">Sports</option>
                <option value="PARTY">Party</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-1">Tagline</label>
            <input required type="text" className="input-field w-full" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} placeholder="A short catchy phrase..." />
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-1">Full Description</label>
            <textarea required className="input-field w-full min-h-[100px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <UploadCloud size={16} /> Cover Image
          </h3>
          <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
            {formData.coverImage ? (
              <div className="relative h-48 w-full">
                <Image src={formData.coverImage} alt="Cover Preview" fill sizes="100vw" className="object-cover rounded-lg" />
                <button type="button" onClick={() => setFormData({...formData, coverImage: ''})} className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg text-white shadow-lg">
                  <Trash size={14} />
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="local-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <label htmlFor="local-upload" className="cursor-pointer flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors">
                  <UploadCloud size={32} />
                  <span className="text-sm">{uploading ? 'Uploading...' : 'Click to Upload Cover Image'}</span>
                </label>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Lists Section */}
        <div className="space-y-8 p-6 bg-black/20 rounded-xl border border-white/5">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <List size={16} /> Detailed Information Builder
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Highlights */}
            <div className="space-y-3">
              <label className="text-sm text-white/80 block flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Highlights</label>
              {formData.highlights.map((item: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <input type="text" className="input-field flex-1" value={item} onChange={e => updateArrayItem('highlights', index, e.target.value)} placeholder="E.g., Traffic-free route" />
                  <button type="button" onClick={() => removeArrayItem('highlights', index)} className="p-3 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('highlights')} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={14} /> Add Highlight</button>
            </div>

            {/* What to Bring */}
            <div className="space-y-3">
              <label className="text-sm text-white/80 block flex items-center gap-2"><ImageIcon size={14} className="text-amber-400" /> What to Bring</label>
              {formData.whatToBring.map((item: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <input type="text" className="input-field flex-1" value={item} onChange={e => updateArrayItem('whatToBring', index, e.target.value)} placeholder="E.g., Valid ID proof" />
                  <button type="button" onClick={() => removeArrayItem('whatToBring', index)} className="p-3 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('whatToBring')} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={14} /> Add Item</button>
            </div>

            {/* Rules */}
            <div className="space-y-3 col-span-full">
              <label className="text-sm text-white/80 block flex items-center gap-2"><AlertTriangle size={14} className="text-rose-400" /> Rules</label>
              {formData.rules.map((item: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <input type="text" className="input-field flex-1" value={item} onChange={e => updateArrayItem('rules', index, e.target.value)} placeholder="E.g., No littering" />
                  <button type="button" onClick={() => removeArrayItem('rules', index)} className="p-3 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('rules')} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={14} /> Add Rule</button>
            </div>

            {/* Schedule */}
            <div className="space-y-3 col-span-full pt-4 border-t border-white/5">
              <label className="text-sm text-white/80 block flex items-center gap-2"><Calendar size={14} className="text-indigo-400" /> Event Schedule</label>
              <div className="grid grid-cols-1 gap-2">
                {formData.schedule.map((item: any, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input type="time" className="input-field w-32" value={item.time} onChange={e => updateScheduleItem(index, 'time', e.target.value)} />
                    <input type="text" className="input-field flex-1" value={item.activity} onChange={e => updateScheduleItem(index, 'activity', e.target.value)} placeholder="Activity name (e.g., Race Flag Off)" />
                    <button type="button" onClick={() => removeScheduleItem(index)} className="p-3 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash size={16} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addScheduleItem} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={14} /> Add Schedule Item</button>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Calendar size={16} /> Event Dates & Batches
          </h3>
          {formData.dates.map((date: any, index: number) => (
            <div key={index} className="flex flex-wrap sm:flex-nowrap gap-2 items-center bg-white/5 p-3 rounded-xl border border-white/10">
              <input required type="date" className="input-field flex-1" value={date.date} onChange={e => updateDate(index, 'date', e.target.value)} />
              <input required type="time" className="input-field w-24" value={date.time} onChange={e => updateDate(index, 'time', e.target.value)} />
              <div className="flex flex-col">
                <label className="text-[10px] text-white/40 uppercase pl-1">Total Slots</label>
                <input required type="number" className="input-field w-20 sm:w-24" placeholder="Total" value={date.spotsTotal} onChange={e => {
                  const newTotal = Number(e.target.value);
                  const difference = newTotal - date.spotsTotal;
                  updateDate(index, 'spotsTotal', newTotal);
                  updateDate(index, 'spotsLeft', Math.max(0, date.spotsLeft + difference));
                }} />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-white/40 uppercase pl-1">Slots Left</label>
                <input required type="number" className="input-field w-20 sm:w-24" placeholder="Left" value={date.spotsLeft} onChange={e => {
                  updateDate(index, 'spotsLeft', Number(e.target.value));
                }} />
              </div>
              <button type="button" onClick={() => {
                const newDates = formData.dates.filter((_: any, i: number) => i !== index);
                setFormData({...formData, dates: newDates});
              }} className="p-3 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash size={16} /></button>
            </div>
          ))}
          <button type="button" onClick={addDate} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={14} /> Add Date Batch</button>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <DollarSign size={16} /> Pricing Table
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-white/40 block mb-1">Solo Price (₹)</label>
              <input required type="number" className="input-field w-full" value={formData.pricing.solo} onChange={e => setFormData({...formData, pricing: { ...formData.pricing, solo: Number(e.target.value) }})} />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1">Duo Price (₹)</label>
              <input required type="number" className="input-field w-full" value={formData.pricing.duo} onChange={e => setFormData({...formData, pricing: { ...formData.pricing, duo: Number(e.target.value) }})} />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1">Group 3 Price (₹)</label>
              <input required type="number" className="input-field w-full" value={formData.pricing.group3} onChange={e => setFormData({...formData, pricing: { ...formData.pricing, group3: Number(e.target.value) }})} />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1">Group 4+ Price (₹)</label>
              <input required type="number" className="input-field w-full" value={formData.pricing.group4plus} onChange={e => setFormData({...formData, pricing: { ...formData.pricing, group4plus: Number(e.target.value) }})} />
            </div>
          </div>
          <div className="mt-4 w-full md:w-1/4">
             <label className="text-xs text-white/40 block mb-1">Minimum Age Required</label>
             <input required type="number" className="input-field w-full" value={formData.minAge} onChange={e => setFormData({...formData, minAge: Number(e.target.value)})} />
          </div>
        </div>

        {/* Map Config */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <MapPin size={16} /> Interactive Map Location
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-2">
            <div className="col-span-3">
              <label className="text-xs text-white/40 block mb-1">Location Address</label>
              <input required type="text" className="input-field w-full" value={formData.mapLocation.address} onChange={e => setFormData({...formData, mapLocation: { ...formData.mapLocation, address: e.target.value }})} />
            </div>
          </div>
          
          <div className="text-xs text-white/60 mb-2">Click anywhere on the map to drop the event pin.</div>
          
          <MapPicker 
            lat={formData.mapLocation.lat} 
            lng={formData.mapLocation.lng} 
            onChange={(lat, lng) => setFormData({...formData, mapLocation: { ...formData.mapLocation, lat, lng }})} 
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-xs text-white/40 block mb-1">Selected Latitude</label>
              <input required type="number" step="0.0001" className="input-field w-full bg-white/5" value={formData.mapLocation.lat} readOnly />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1">Selected Longitude</label>
              <input required type="number" step="0.0001" className="input-field w-full bg-white/5" value={formData.mapLocation.lng} readOnly />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-8 border-t border-white/10">
          <button type="button" onClick={onCancel} className="flex-1 py-3 px-4 rounded-xl text-white hover:bg-white/5 font-medium border border-white/10">Cancel</button>
          <button type="submit" disabled={loading || uploading} className="flex-1 btn-primary py-3 px-4 rounded-xl font-medium disabled:opacity-50">
            <span className="relative z-10">{loading ? 'Saving...' : initialData ? 'Update Event' : 'Publish Event'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
