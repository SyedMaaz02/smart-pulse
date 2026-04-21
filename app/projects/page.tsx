import NavigationLayout from "@/components/NavigationLayout";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface TaskCard {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string | null;
  date?: string | null;
  hasAttachment?: boolean;
  avatarCount?: number;
  progress?: number;
  showApprove?: boolean;
  completedDate?: string;
}

interface KanbanColumn {
  title: string;
  count: number;
  isDone?: boolean;
  cards: TaskCard[];
}

// Static task data derived from the Stitch workspace design
const columns: KanbanColumn[] = [
  {
    title: "To Do",
    count: 3,
    cards: [
      {
        id: "t1",
        tag: "Strategy",
        tagColor: "bg-tertiary-fixed text-on-tertiary-fixed",
        title: "Q4 Market Research Synthesis",
        description: "Consolidate all qualitative interview data from the October focus groups.",
        date: "Oct 24",
        hasAttachment: true,
        avatarCount: 2,
      },
      {
        id: "t2",
        tag: "Design",
        tagColor: "bg-secondary-fixed text-on-secondary-fixed",
        title: "Initial Wireframes for Mobile App",
        description: "Drafting the core checkout flow and user profile dashboard.",
        date: "Oct 26",
        hasAttachment: false,
        avatarCount: 0,
      },
    ],
  },
  {
    title: "In Progress",
    count: 1,
    cards: [
      {
        id: "t3",
        tag: "Development",
        tagColor: "bg-primary-fixed text-primary",
        title: "API Integration for Payment Gateway",
        description: "Testing the Stripe webhooks and secure vaulting mechanisms.",
        date: null,
        progress: 75,
        hasAttachment: false,
        avatarCount: 0,
      },
    ],
  },
  {
    title: "Review",
    count: 2,
    cards: [
      {
        id: "t4",
        tag: "Urgent",
        tagColor: "bg-error-container text-error",
        title: "Brand Guidelines Draft V2",
        description: "Client feedback integrated from last Thursday\u0027s workshop.",
        date: null,
        hasAttachment: false,
        avatarCount: 0,
        showApprove: true,
      },
    ],
  },
  {
    title: "Done",
    count: 12,
    isDone: true,
    cards: [
      {
        id: "t5",
        tag: "Planning",
        tagColor: "bg-slate-200 text-slate-500",
        title: "Project Kickoff Meeting",
        description: null,
        completedDate: "Completed Oct 12",
      },
    ],
  },
];

const files = [
  { name: "Brand_Strategy_Final.pdf", size: "4.2 MB", date: "Oct 20", icon: "picture_as_pdf", iconBg: "bg-error-container text-error" },
  { name: "Logo_Pack_Vector.zip", size: "12.8 MB", date: "Oct 18", icon: "image", iconBg: "bg-primary-fixed text-primary" },
  { name: "Q4_Budget_Projection.xlsx", size: "1.1 MB", date: "Oct 15", icon: "description", iconBg: "bg-tertiary-fixed text-on-tertiary-container" },
];

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <NavigationLayout activePath="/projects">
      <div className="flex flex-1 overflow-hidden -m-8 -mt-20 pt-20">
        {/* Kanban Board */}
        <section className="flex-1 overflow-x-auto p-8 flex gap-6 items-start">
          {columns.map((col) => (
            <div key={col.title} className={`flex-shrink-0 w-[320px] flex flex-col gap-4 ${col.isDone ? "opacity-70" : ""}`}>
              <div className="flex justify-between items-center px-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                  {col.title} <span className="ml-2 text-slate-400 font-medium">{col.count}</span>
                </h3>
                <button className="material-symbols-outlined text-slate-400 hover:text-primary">more_horiz</button>
              </div>
              <div className="space-y-4">
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    className={`bg-surface-container-lowest p-5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] border ${
                      col.title === "In Progress" ? "border-primary/20" : col.isDone ? "border-outline-variant/5" : "border-outline-variant/10"
                    } group ${!col.isDone ? "cursor-grab active:cursor-grabbing" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2 py-0.5 ${card.tagColor} text-[10px] font-bold uppercase tracking-wider rounded ${col.isDone ? "line-through" : ""}`}>
                        {card.tag}
                      </span>
                      {col.isDone && (
                        <span className="material-symbols-outlined text-[#10b981] text-lg">check_circle</span>
                      )}
                      {card.hasAttachment && (
                        <span className="material-symbols-outlined text-slate-300 text-sm">attach_file</span>
                      )}
                      {col.title === "In Progress" && (
                        <span className="material-symbols-outlined text-on-tertiary-container text-sm">trending_up</span>
                      )}
                    </div>
                    <h4 className={`font-headline font-bold mb-2 leading-tight ${col.isDone ? "text-slate-400 line-through" : "text-on-surface"}`}>
                      {card.title}
                    </h4>
                    {card.description && !col.isDone && (
                      <p className="text-on-surface-variant text-xs mb-4 line-clamp-2">{card.description}</p>
                    )}
                    {col.isDone && card.completedDate && (
                      <div className="text-[10px] text-slate-400 font-medium">{card.completedDate}</div>
                    )}
                    {card.progress !== undefined && (
                      <div className="h-1 w-full bg-surface-container rounded-full mb-4 overflow-hidden">
                        <div className="h-full bg-on-tertiary-container rounded-full" style={{ width: `${card.progress}%` }} />
                      </div>
                    )}
                    {!col.isDone && (
                      <div className="flex items-center justify-between">
                        {card.avatarCount !== undefined && card.avatarCount > 0 && (
                          <div className="flex -space-x-2">
                            <div className="h-6 w-6 rounded-full bg-primary-fixed-dim border-2 border-white flex items-center justify-center text-[8px] font-bold text-primary">
                              +{card.avatarCount}
                            </div>
                          </div>
                        )}
                        {card.date && (
                          <div className="flex items-center gap-1 text-on-surface-variant text-[10px] font-medium">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            <span>{card.date}</span>
                          </div>
                        )}
                        {card.progress !== undefined && (
                          <div className="flex items-center gap-1 text-on-tertiary-container text-[10px] font-bold">
                            <span>{card.progress}% Done</span>
                          </div>
                        )}
                        {card.showApprove && (
                          <button className="text-[10px] font-bold text-[#10b981] hover:underline">Approve</button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {!col.isDone && (
                <button className="w-full py-3 flex items-center justify-center gap-2 text-slate-400 hover:text-primary-container hover:bg-surface-container transition-colors text-xs font-semibold rounded-lg border-2 border-dashed border-outline-variant/20">
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Add Task</span>
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Right Sidebar: Files & Chat */}
        <aside className="w-80 bg-surface-container-low flex flex-col flex-shrink-0">
          {/* Project Files */}
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-bold text-base tracking-tight">Project Files</h3>
              <button className="material-symbols-outlined text-slate-400">upload_file</button>
            </div>
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.name} className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg hover:bg-white transition-colors cursor-pointer group">
                  <div className={`h-10 w-10 ${file.iconBg} rounded flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{file.icon}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs font-bold text-on-surface truncate">{file.name}</div>
                    <div className="text-[10px] text-on-surface-variant">{file.size} • {file.date}</div>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary text-sm">download</span>
                </div>
              ))}
            </div>
          </div>
          {/* Client Chat Preview */}
          <div className="h-1/2 bg-surface-container-lowest p-6 shadow-[0_-8px_24px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                <h3 className="font-headline font-bold text-base tracking-tight">Client Chat</h3>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">open_in_full</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary-fixed-dim flex items-center justify-center text-[8px] font-bold text-primary">SC</div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-on-surface-variant mb-1">Sarah (Client)</div>
                  <div className="bg-surface-container text-on-surface text-xs p-3 rounded-lg rounded-tl-none">
                    The mobile designs look great! Can we discuss the checkout flow?
                  </div>
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="flex-1 text-right">
                  <div className="text-[10px] font-bold text-[#10b981] mb-1">You</div>
                  <div className="bg-primary text-on-primary text-xs p-3 rounded-lg rounded-tr-none text-left">
                    Absolutely. I&apos;ve updated the review board with the latest wireframes.
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <input className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-xs pr-10 focus:ring-1 ring-[#10b981]" placeholder="Type a message..." type="text" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#10b981] material-symbols-outlined">send</button>
            </div>
          </div>
        </aside>
      </div>
    </NavigationLayout>
  );
}
