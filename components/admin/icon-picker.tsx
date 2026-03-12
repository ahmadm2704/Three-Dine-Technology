"use client";

import * as LucideIcons from "lucide-react";

export const IT_ICONS: { name: string; label: string }[] = [
  { name: "Code2", label: "Code" },
  { name: "Smartphone", label: "Mobile" },
  { name: "Cloud", label: "Cloud" },
  { name: "Brain", label: "AI / Brain" },
  { name: "ShoppingCart", label: "E-Commerce" },
  { name: "Shield", label: "Security" },
  { name: "Database", label: "Database" },
  { name: "Layout", label: "UI / Layout" },
  { name: "Network", label: "Network" },
  { name: "Server", label: "Server" },
  { name: "ServerCog", label: "Server Config" },
  { name: "HardDrive", label: "Hard Drive" },
  { name: "Globe", label: "Globe / Web" },
  { name: "Lock", label: "Lock" },
  { name: "Cpu", label: "CPU / Hardware" },
  { name: "Wifi", label: "Wi-Fi" },
  { name: "Monitor", label: "Monitor" },
  { name: "Settings", label: "Settings" },
  { name: "Wrench", label: "Maintenance" },
  { name: "BarChart", label: "Bar Chart" },
  { name: "LineChart", label: "Line Chart" },
  { name: "PieChart", label: "Pie Chart" },
  { name: "Layers", label: "Layers / Stack" },
  { name: "GitBranch", label: "Git / DevOps" },
  { name: "Terminal", label: "Terminal" },
  { name: "Bot", label: "Automation / Bot" },
  { name: "Zap", label: "Performance" },
  { name: "Search", label: "SEO / Search" },
  { name: "Mail", label: "Email" },
  { name: "MessageSquare", label: "Chat / Support" },
  { name: "FileCode", label: "File / Code" },
  { name: "Blocks", label: "Blocks / Modules" },
  { name: "Boxes", label: "Packages" },
];

interface IconPickerProps {
  value: string;
  onChange: (name: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
        Icon
      </label>

      {/* Preview of selected */}
      <div className="flex items-center gap-3 mb-3 p-3 border-2 border-gray-200 bg-gray-50">
        {(() => {
          const Icon = (LucideIcons as any)[value];
          return Icon ? <Icon className="w-6 h-6 text-black" /> : null;
        })()}
        <span className="font-bold text-sm">{value}</span>
      </div>

      {/* Icon grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto border-2 border-gray-200 p-3 bg-white">
        {IT_ICONS.map(({ name, label }) => {
          const Icon = (LucideIcons as any)[name];
          if (!Icon) return null;
          const selected = value === name;
          return (
            <button
              key={name}
              type="button"
              title={label}
              onClick={() => onChange(name)}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded border-2 transition-all ${
                selected
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-400 text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase leading-tight text-center line-clamp-1">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
