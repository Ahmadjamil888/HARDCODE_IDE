'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewProjectDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [targetDevice, setTargetDevice] = React.useState('arduino_uno');
  const [language, setLanguage] = React.useState('c_cpp');
  const router = useRouter();

  const handleCreate = async () => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name, targetDevice, language })
    });
    const project = await res.json();
    router.push(`/project/${project.id}`);
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-[#238636] hover:bg-[#2ea043] text-white font-bold h-11 px-6 rounded-lg gap-2"
      >
        <Plus className="w-5 h-5" />
        New Project
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl w-full max-w-md p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl font-bold">Launch New Project</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#7d8590] uppercase">Project Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-[#30363d] rounded-lg px-4 py-3 focus:border-[#58a6ff] outline-none transition-all"
              placeholder="e.g. Smart-Home-Controller"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#7d8590] uppercase">Target Hardware</label>
            <select 
              value={targetDevice}
              onChange={(e) => setTargetDevice(e.target.value)}
              className="w-full bg-black border border-[#30363d] rounded-lg px-4 py-3 focus:border-[#58a6ff] outline-none transition-all appearance-none"
            >
              <option value="arduino_uno">Arduino Uno</option>
              <option value="esp32">ESP32 Development Board</option>
              <option value="raspberry_pi_pico">Raspberry Pi Pico (RP2040)</option>
              <option value="stm32_f103">STM32 Blue Pill</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            variant="ghost" 
            className="flex-1 h-12 text-[#7d8590]" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 h-12 bg-[#58a6ff] text-black font-bold"
            onClick={handleCreate}
            disabled={!name}
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
}
