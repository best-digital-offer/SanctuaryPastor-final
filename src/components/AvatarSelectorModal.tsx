import React, { useState, useRef } from 'react';
import { READY_MADE_AVATARS, resizeImageToDataUrl } from '../data/avatars';
import { X, Upload, Check, Camera, Image as ImageIcon } from 'lucide-react';

interface AvatarSelectorModalProps {
  currentAvatar?: string;
  onSaveAvatar: (avatarUrl: string) => void;
  onClose: () => void;
}

export const AvatarSelectorModal: React.FC<AvatarSelectorModalProps> = ({
  currentAvatar,
  onSaveAvatar,
  onClose,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    currentAvatar || READY_MADE_AVATARS[0].svgDataUri
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ready-made' | 'upload'>('ready-made');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      const dataUrl = await resizeImageToDataUrl(file, 160);
      setSelectedAvatar(dataUrl);
      setActiveTab('upload');
    } catch (err) {
      console.error(err);
      setUploadError('Failed to process image. Please try another image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please drop a valid image file.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      const dataUrl = await resizeImageToDataUrl(file, 160);
      setSelectedAvatar(dataUrl);
      setActiveTab('upload');
    } catch (err) {
      console.error(err);
      setUploadError('Failed to process image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    onSaveAvatar(selectedAvatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0A1128] border border-[#1C2C55] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-5 p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C2C55]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Choose Profile Avatar</h3>
              <p className="text-[11px] text-slate-400">Personalize your sacred prayer presence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Selection Preview */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-[#0E1A38] border border-[#1C2C55]">
          <img
            src={selectedAvatar}
            alt="Selected Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0 bg-slate-900"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Current Selection</span>
            <h4 className="text-sm font-semibold text-white truncate">
              {READY_MADE_AVATARS.find((a) => a.svgDataUri === selectedAvatar)?.name || 'Custom Uploaded Photo'}
            </h4>
            <p className="text-[11px] text-slate-400">This avatar will be displayed across your profile and prayers.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-[#070D1C] p-1 border border-[#152347]">
          <button
            type="button"
            onClick={() => setActiveTab('ready-made')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'ready-made'
                ? 'bg-[#18274E] text-amber-300 shadow-sm border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Ready-Made Sacred Emblems</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-[#18274E] text-amber-300 shadow-sm border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Your Photo</span>
          </button>
        </div>

        {/* Tab 1: Ready-Made SVG Avatars */}
        {activeTab === 'ready-made' && (
          <div className="space-y-2">
            <span className="text-[11px] text-slate-400 font-medium">Select a biblical or spiritual emblem:</span>
            <div className="grid grid-cols-4 gap-3 max-h-56 overflow-y-auto pr-1">
              {READY_MADE_AVATARS.map((avatar) => {
                const isSelected = selectedAvatar === avatar.svgDataUri;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.svgDataUri)}
                    className={`relative p-2 rounded-xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer group text-center ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 ring-2 ring-amber-400/40'
                        : 'bg-[#0E1A38] border-[#1C2C55] hover:border-amber-400/50 hover:bg-[#122045]'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={avatar.svgDataUri}
                        alt={avatar.name}
                        className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-950"
                      />
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-slate-200 truncate w-full group-hover:text-amber-300 transition-colors">
                      {avatar.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Upload Own Photo */}
        {activeTab === 'upload' && (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#243769] hover:border-amber-400/60 rounded-xl p-6 text-center cursor-pointer bg-[#0A132C]/60 hover:bg-[#0E1B3E] transition-all space-y-2"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Click or drag & drop to upload your photo</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Supports PNG, JPG, GIF, WebP (auto-scaled)</p>
              </div>
              {isUploading && <p className="text-xs text-amber-300 animate-pulse">Processing image...</p>}
            </div>

            {uploadError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg text-center">
                {uploadError}
              </p>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1C2C55]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            id="save-avatar-btn"
            onClick={handleConfirm}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 hover:brightness-110 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Apply Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
