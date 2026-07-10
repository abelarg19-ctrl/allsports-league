"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, Swords } from "lucide-react";
import { Match } from "@/lib/types";
import { TeamService } from "@/services/team.service";
import { Card, CardContent } from "@/components/ui/card";

type Props={matches:Match[]};
type TeamMap=Record<number,string>;

function UpcomingMatches({matches}:Props){
 const [teamNames,setTeamNames]=useState<TeamMap>({});
 const ids=useMemo(()=>Array.from(new Set(matches.flatMap(m=>[m.home_team_id,m.away_team_id]))),[matches]);

 useEffect(()=>{async function load(){if(!ids.length)return;try{setTeamNames(await TeamService.getNames(ids));}catch(e){console.error(e);}};void load();},[ids]);

 if(!matches.length){
  return <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"><CardContent className="p-6"><div className="rounded-2xl border border-dashed border-white/10 p-10 text-center"><CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground"/><p className="text-muted-foreground">No upcoming matches.</p></div></CardContent></Card>;
 }

 return (
 <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
 <CardContent className="p-6">
 <div className="mb-6 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10"><CalendarDays className="h-6 w-6 text-cyan-400"/></div><div><h2 className="text-xl font-bold">Upcoming Matches</h2><p className="text-sm text-muted-foreground">Next scheduled games</p></div></div>
 <div className="space-y-4">{matches.map(match=><div key={match.id} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/10"><div className="flex items-center justify-between"><div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10"><Swords className="h-6 w-6 text-cyan-400"/></div><div><h3 className="font-semibold">{teamNames[match.home_team_id]??"Loading..."}</h3><p className="text-xs text-muted-foreground">vs</p><h3 className="font-semibold">{teamNames[match.away_team_id]??"Loading..."}</h3></div></div><div className="text-right"><div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300"><Clock3 className="h-3.5 w-3.5"/>{match.status}</div><p className="mt-3 text-sm text-muted-foreground">Round {match.round}</p>{match.starts_at&&<><p className="mt-1 text-xs text-muted-foreground">{new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(new Date(match.starts_at))}</p><p className="text-xs text-cyan-300">{new Date(match.starts_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p></>}</div></div></div>)}</div>
 </CardContent></Card>);
}
export default memo(UpcomingMatches);
