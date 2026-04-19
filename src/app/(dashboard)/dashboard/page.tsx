'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Code, 
  Cpu, 
  Clock, 
  ChevronRight, 
  LogOut, 
  Settings, 
  HardDrive,
  Zap,
  Terminal,
  ShieldCheck,
  LayoutGrid,
  Sparkles
} from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserAndProjects = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('updated_at', { ascending: false });
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchUserAndProjects();
  }, [supabase]);

  const handleCreateProject = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('projects')
      .insert([
        { 
          name: 'New Firmware Project', 
          owner_id: user.id,
          settings: { mcu: 'STM32H743', toolchain: 'Arm GCC' }
        }
      ])
      .select()
      .single();

    if (data) {
      router.push(`/project/${data.id}`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Structural Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none app-grid"></div>

      {/* Sidebar Terminal Link */}
      <div className="fixed left-0 top-0 bottom-0 w-14 border-r border-white/5 bg-[#050505] flex flex-col items-center py-8 z-50">
        <Link href="/" className="mb-10 w-8 h-8 flex items-center justify-center bg-white rounded-md">
           <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_10px_white]" />
        </Link>
        <div className="flex-1 space-y-6 text-white/20">
           <LayoutGrid className="w-5 h-5 text-white" />
           <HardDrive className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
           <Cpu className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
           <Zap className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
        </div>
        <div className="space-y-6 text-white/20">
           <Settings className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
           <button onClick={handleSignOut}><LogOut className="w-5 h-5 hover:text-white transition-colors" /></button>
        </div>
      </div>

      <main className="pl-14 min-h-screen relative z-10 flex flex-col">
        {/* Header Protocol */}
        <header className="h-16 border-b border-white/5 bg-black/50 backdrop-blur-xl px-12 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-6">
              <h1 className="text-[13px] font-bold tracking-[.2em] uppercase text-white/90">Registry_Registry</h1>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/30">
                 <Terminal className="w-3.5 h-3.5" />
                 usr@hardcode-ai:~$ ls projects/
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                 <input 
                   placeholder="Search synthesis log..."
                   className="bg-[#0a0a0a] border border-white/5 rounded-md pl-10 pr-4 py-2 text-[11px] font-mono w-64 focus:border-white/20 outline-none transition-all"
                 />
              </div>
              <button 
                onClick={handleCreateProject}
                className="bg-white text-black px-4 py-2 text-[11px] font-bold tracking-widest uppercase rounded-sm hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                Initialize
              </button>
           </div>
        </header>

        {/* Console View */}
        <div className="flex-1 p-12 space-y-12 max-w-7xl">
           <div className="space-y-4">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/20 font-bold">
                 <Sparkles className="w-3.5 h-3.5" />
                 Active_Development_Treads
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length === 0 ? (
                  <div className="col-span-full py-20 border border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center space-y-4 opacity-20">
                     <Cpu className="w-10 h-10" />
                     <p className="text-[11px] uppercase tracking-[.2em] font-mono">No active synthesis found</p>
                  </div>
                ) : (
                  projects.map((project) => (
                    <Link 
                      key={project.id}
                      href={`/project/${project.id}`}
                      className="group p-6 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-white/20 transition-all space-y-6 noir-shadow"
                    >
                      <div className="flex items-center justify-between">
                         <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-black group-hover:border-white/30 transition-all rounded-lg">
                           <Code className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                         </div>
                         <div className="flex gap-2">
                            <span className="text-[9px] px-2 py-0.5 border border-white/10 rounded-sm text-white/30 font-mono">v1.5_PRO</span>
                            <span className="text-[9px] px-2 py-0.5 border border-white/10 rounded-sm text-white/30 font-mono">HIL:OFF</span>
                         </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform">{project.name}</h3>
                        <p className="text-[11px] text-white/30 font-mono tracking-tight leading-relaxed">
                          MCU_TARGET: STM32H743 <br/>
                          LAST_SYNTH: {new Date(project.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-white/[0.03] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Open Workspace</span>
                         <ChevronRight className="w-3 h-3 text-white/40" />
                      </div>
                    </Link>
                  ))
                )}
              </div>
           </div>

           {/* System Telemetry */}
           <div className="space-y-4 opacity-50">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/20 font-bold">
                 <Terminal className="w-3.5 h-3.5" />
                 System_Telemetry
              </div>
              <div className="bg-[#050505] border border-white/5 rounded-xl p-8 grid grid-cols-4 gap-12 font-mono">
                 {[
                    { label: 'Token Cache', value: '42.8MB' },
                    { label: 'Latency', value: '0.2ms' },
                    { label: 'Synthesis Count', value: '1,492' },
                    { label: 'Nodes Active', value: '3,842' },
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="text-[9px] uppercase text-white/20">{stat.label}</div>
                      <div className="text-sm text-white font-bold">{stat.value}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
