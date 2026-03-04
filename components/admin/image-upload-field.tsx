"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadFieldProps {
    label?: string;
    value: string;
    onChange: (url: string) => void;
}

export function ImageUploadField({ label = "Image", value, onChange }: ImageUploadFieldProps) {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();

            if (data.success) {
                onChange(data.url);
            } else {
                alert(data.message || "Upload failed");
            }
        } catch {
            alert("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) handleUpload(file);
    };

    const handleRemove = () => {
        onChange("");
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</label>

            {/* Preview */}
            {value && (
                <div className="relative inline-block mb-3">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-32 h-32 object-cover border-2 border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}

            {/* Drop zone */}
            <div
                className={`border-2 border-dashed p-4 text-center cursor-pointer transition-colors ${
                    dragOver ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                } ${uploading ? "pointer-events-none opacity-60" : ""}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
            >
                {uploading ? (
                    <div className="flex items-center justify-center space-x-2 py-2">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Uploading...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-1 py-2">
                        <Upload className="w-6 h-6 text-gray-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            Click or drag image here
                        </span>
                        <span className="text-[10px] text-gray-400">JPG, PNG, GIF, WebP — Max 5MB</span>
                    </div>
                )}
            </div>

            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Manual URL input */}
            <div className="mt-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border-2 border-gray-200 p-2 text-xs focus:border-black focus:outline-none text-gray-500"
                    placeholder="Or paste image URL here..."
                />
            </div>
        </div>
    );
}
