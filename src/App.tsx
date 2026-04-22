/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { TIMELINE, SectionData, ReportItem } from './types';
import { REPORT_DATA } from './constants';
import { 
  Milestone, Flag, Target, TrendingUp, Link as LinkIcon, CheckCircle2,
  ClipboardList, Activity, ChefHat, FileText, BookOpen, MessageSquare, ShoppingBag, 
  Cpu, Database, Zap, UserCheck, Search, Microscope, User, ArrowRight,
  Smartphone, Box, Users, CreditCard, Award, LucideIcon 
} from 'lucide-react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, { 
  Handle, Position, Background, Edge, Node, 
  MarkerType, ConnectionLineType, BackgroundVariant,
  useNodesState, useEdgesState, addEdge, Connection,
  Panel, ReactFlowProvider, BaseEdge, EdgeLabelRenderer, 
  getBezierPath, useReactFlow 
} from 'reactflow';
import 'reactflow/dist/style.css';

const IconMap: Record<string, LucideIcon> = {
  ClipboardList, Activity, ChefHat, FileText, BookOpen, MessageSquare, ShoppingBag,
  Cpu, Database, Zap, UserCheck, Search, Microscope, User, ArrowRight,
  Smartphone, Box, Users, CreditCard, Award
};

const Seal = ({ text }: { text: string }) => {
  if (text === '素问') {
    return (
      <img 
        src="./20260420-002312.jpeg" 
        alt="素问 Logo" 
        className="h-20 w-auto object-contain brightness-110" 
        referrerPolicy="no-referrer" 
      />
    );
  }
  return (
    <div className="inline-flex items-center justify-center border-2 border-tcm-seal text-tcm-seal w-12 h-12 rotate-[-5deg] font-serif font-bold text-lg p-1 mr-4 shrink-0">
      <span className="text-center leading-tight">{text}</span>
    </div>
  );
};

const LogicNode = ({ data, selected }: any) => {
  const Icon = data.icon;
  const isTarget = data.type === 'end';
  const isIntelligence = data.type === 'intelligence';

  return (
    <div className={`
      relative min-w-[320px] max-w-[400px] transition-all duration-500
      ${selected ? 'scale-[1.02]' : 'scale-100'}
    `}>
      <div className={`
        relative flex flex-col gap-4 p-7 rounded-2xl border-2 shadow-2xl group
        ${isTarget ? 'bg-tcm-seal border-tcm-seal text-white py-14 rotate-1' : 
          isIntelligence ? 'bg-white border-tcm-seal shadow-tcm-seal/10 ring-4 ring-tcm-seal/5' :
          'bg-white border-tcm-border hover:border-tcm-ink'}
      `}>
        {/* Handles */}
        <Handle type="target" position={Position.Left} className="!w-4 !h-4 !-left-2 !bg-white !border-2 !border-tcm-seal shadow-md transition-transform hover:scale-125" />
        <Handle type="source" position={Position.Right} className="!w-4 !h-4 !-right-2 !bg-white !border-2 !border-tcm-seal shadow-md transition-transform hover:scale-125" />

        <div className="flex items-start gap-5">
          <div className={`
            shrink-0 w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 group-hover:rotate-6
            ${isTarget ? 'bg-white/20 border-white text-white' : 
              isIntelligence ? 'bg-tcm-seal border-tcm-seal text-white' :
              'bg-tcm-paper border-tcm-border text-tcm-ink group-hover:border-tcm-seal group-hover:text-tcm-seal'}
          `}>
            <Icon size={32} strokeWidth={1.5} />
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <h4 className={`font-serif font-black tracking-tight leading-tight
              ${isTarget ? 'text-3xl' : 'text-2xl text-tcm-ink'}`}>
              {data.label}
            </h4>
            <div className={`h-1 w-12 rounded-full mb-1
              ${isTarget ? 'bg-white/30' : 'bg-tcm-seal/40'}`} />
          </div>
        </div>

        <div className="relative">
          {data.content && (
            <p className={`font-serif leading-relaxed text-[15px]
              ${isTarget ? 'text-white/80 uppercase tracking-widest font-black italic' : 
                'text-tcm-ink/70 group-hover:text-tcm-ink transition-colors'}`}>
              {data.content}
            </p>
          )}
        </div>

        {/* Decorative elements */}
        <div className={`absolute top-4 right-4 text-[10px] items-center gap-1 opacity-20 hidden md:flex
          ${isTarget ? 'text-white' : 'text-tcm-ink'}`}>
          <div className="w-1 h-1 rounded-full bg-current" />
          <span className="font-sans uppercase tracking-[0.3em]">PRO SYSTEM v3</span>
        </div>
      </div>
    </div>
  );
};

const TCMEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: any) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { setEdges } = useReactFlow();

  const onEdgeClick = (evt: any) => {
    evt.stopPropagation();
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{ 
          ...style, 
          stroke: selected ? '#b22222' : style.stroke,
          strokeWidth: selected ? (style.strokeWidth as number + 1) : style.strokeWidth,
          transition: 'all 0.3s'
        }} 
        interactionWidth={20}
      />
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="group/edge relative"
            >
              <button 
                title="删除连接"
                className="w-10 h-10 bg-tcm-seal text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(178,34,34,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white cursor-pointer"
                onClick={onEdgeClick}
              >
                <div className="font-sans font-black text-xl select-none">×</div>
              </button>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-tcm-ink text-white text-[10px] px-3 py-1.5 rounded-full shadow-xl opacity-0 group-hover/edge:opacity-100 transition-opacity pointer-events-none uppercase tracking-[0.3em] font-black border border-white/20 backdrop-blur-sm">
                Delete Path
              </div>
            </motion.div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

const DiagramContent = ({ items }: { items: ReportItem[] }) => {
  const nodeTypes = useMemo(() => ({ logic: LogicNode }), []);
  const edgeTypes = useMemo(() => ({ tcm: TCMEdge }), []);

  const defaultNodes: Node[] = [
    // Layer 1: Content/Supply
    { id: 'n0', type: 'logic', position: { x: 50, y: 50 }, data: { label: items[0].title, content: items[0].content, icon: Cpu } },
    { id: 'n1', type: 'logic', position: { x: 50, y: 250 }, data: { label: items[1].title, content: items[1].content, icon: Database } },

    // Layer 2: Integration
    { id: 'n2', type: 'logic', position: { x: 350, y: 150 }, data: { label: items[2].title, content: items[2].content, icon: Zap, type: 'middleware' } },

    // Layer 3: Intelligence
    { id: 'n4', type: 'logic', position: { x: 650, y: 50 }, data: { label: items[4].title, content: items[4].content, icon: Search, type: 'intelligence' } },
    { id: 'n3', type: 'logic', position: { x: 650, y: 250 }, data: { label: items[3].title, content: items[3].content, icon: UserCheck, type: 'intelligence' } },

    // Layer 4: Decision
    { id: 'n5', type: 'logic', position: { x: 950, y: 150 }, data: { label: items[5].title, content: items[5].content, icon: Microscope } },

    // Layer 5: Target
    { id: 'user', type: 'logic', position: { x: 1250, y: 120 }, data: { label: '最终用户', content: 'END DELIVERY', icon: User, type: 'end' } },
  ];

  const defaultEdges: Edge[] = [
    { id: 'e0-2', source: 'n0', target: 'n2', animated: true, type: 'tcm', style: { strokeWidth: 3 } },
    { id: 'e1-2', source: 'n1', target: 'n2', animated: true, type: 'tcm', style: { strokeWidth: 3 } },
    { id: 'e2-3', source: 'n2', target: 'n3', type: 'tcm', style: { strokeDasharray: '4 4', strokeWidth: 2 } },
    { id: 'e2-4', source: 'n2', target: 'n4', type: 'tcm', style: { strokeDasharray: '4 4', strokeWidth: 2 } },
    { id: 'e3-5', source: 'n3', target: 'n5', type: 'tcm', style: { strokeWidth: 4 } },
    { id: 'e4-5', source: 'n4', target: 'n5', type: 'tcm', style: { strokeWidth: 4 } },
    { id: 'e5-user', source: 'n5', target: 'user', type: 'tcm', style: { stroke: '#b22222', strokeWidth: 5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#b22222' } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ 
        ...params, 
        type: 'tcm',
        animated: true, 
        style: { strokeWidth: 3 } 
    }, eds));
  }, [setEdges]);

  return (
    <div className="w-full h-[650px] bg-tcm-paper-darker/10 border-y border-tcm-border relative overflow-hidden group">
      {/* Background Stages Headers */}
      <div className="absolute inset-x-0 top-0 h-10 flex items-center justify-around z-0 border-b border-tcm-border/20 bg-white/40 backdrop-blur-sm">
        {['内容与供应端', '整合中枢', '智能逻辑单元', '辅助决策专家', '最终交付'].map((s, i) => (
          <div key={i} className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-tcm-ink/30">
            {s}
          </div>
        ))}
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        snapToGrid={true}
        snapGrid={[25, 25]}
        className="bg-transparent"
      >
        <Background 
          color="#1a1a1a" 
          gap={25} 
          size={0.6} 
          variant={BackgroundVariant.Dots} 
          className="opacity-10" 
        />
      </ReactFlow>

      {/* Corporate Info Watermark */}
      <div className="absolute bottom-6 right-6 opacity-30 text-[9px] tracking-[0.5em] font-sans uppercase pointer-events-none">
        Architecture Diagram // All Rights Reserved
      </div>
    </div>
  );
};

const Diagram = (props: { items: ReportItem[] }) => (
  <ReactFlowProvider>
    <DiagramContent {...props} />
  </ReactFlowProvider>
);

const CustomNode = ({ data, selected }: any) => {
  const Icon = data.icon;
  const isCore = data.type === 'core';
  const isUser = data.type === 'user';
  const isSource = data.type === 'source' || data.type === 'member';

  return (
    <div className={`
      relative min-w-[260px] p-1 transition-all duration-500
      ${selected ? 'scale-[1.02]' : 'scale-100'}
    `}>
      {/* Glow Effect for Selected */}
      {selected && (
        <div className="absolute inset-0 bg-tcm-seal/10 blur-2xl rounded-3xl -z-10 animate-pulse" />
      )}

      <div className={`
        relative flex items-center gap-5 p-6 rounded-3xl border-2 overflow-hidden
        ${isCore ? 'bg-white border-tcm-seal shadow-[0_20px_50px_rgba(178,34,34,0.15)] ring-8 ring-tcm-seal/5' : 
          isUser ? 'bg-tcm-ink border-tcm-ink text-white shadow-2xl py-8' : 
          'bg-white/95 backdrop-blur-xl border-tcm-border shadow-xl hover:border-tcm-seal/50 transition-colors'}
        ${selected ? 'border-tcm-ink shadow-2xl' : ''}
      `}>
        {/* Handles - Visible and styled */}
        <Handle 
          type="target" 
          position={Position.Left} 
          className="!w-5 !h-5 !-left-2.5 !bg-white !border-2 !border-tcm-seal shadow-md transition-transform hover:scale-125" 
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          className="!w-5 !h-5 !-right-2.5 !bg-white !border-2 !border-tcm-seal shadow-md transition-transform hover:scale-125" 
        />

        <div className={`
          shrink-0 flex items-center justify-center rounded-2xl transition-all duration-700
          ${isCore ? 'w-16 h-16 bg-tcm-seal text-white rotate-3 group-hover:rotate-0 shadow-lg' : 
            isUser ? 'w-20 h-20 bg-white/10 text-white' : 
            'w-12 h-12 bg-tcm-paper text-tcm-ink/60 shadow-inner group-hover:text-tcm-seal'}
        `}>
          <Icon size={isUser ? 40 : 28} strokeWidth={isCore ? 1.5 : 2} />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className={`font-serif tracking-tight leading-none
            ${isCore ? 'text-2xl font-black text-tcm-ink' : 
              isUser ? 'text-3xl font-black text-white' : 
              'text-xl font-bold text-tcm-ink/90 group-hover:text-tcm-ink'}`}>
            {data.label}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div className={`h-1 w-8 rounded-full ${isUser ? 'bg-white/20' : 'bg-tcm-seal/20'}`} />
            {isSource && <span className="text-[10px] text-tcm-ink/40 font-sans tracking-[0.25em] uppercase font-black">Provider</span>}
            {isCore && <span className="text-[10px] text-tcm-seal/60 font-sans tracking-[0.25em] uppercase font-black">Matrix</span>}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
          <Icon size={120} />
        </div>
      </div>
    </div>
  );
};

const BusinessLoopContent = ({ items }: { items: ReportItem[] }) => {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ tcm: TCMEdge }), []);

  const defaultNodes: Node[] = [
    { id: 'content', type: 'custom', position: { x: 50, y: 50 }, data: { label: items[0].title, icon: BookOpen, type: 'source' } },
    { id: 'tools', type: 'custom', position: { x: 50, y: 250 }, data: { label: items[1].title, icon: Smartphone, type: 'source' } },
    { id: 'member', type: 'custom', position: { x: 50, y: 450 }, data: { label: items[8].title, icon: CreditCard, type: 'source' } },
    { id: 'app', type: 'custom', position: { x: 350, y: 220 }, data: { label: items[2].title, icon: Box, type: 'core' } },
    { id: 'shop1', type: 'custom', position: { x: 650, y: 100 }, data: { label: items[3].title, icon: ShoppingBag, type: 'shop' } },
    { id: 'shop2', type: 'custom', position: { x: 650, y: 250 }, data: { label: items[4].title, icon: ShoppingBag, type: 'shop' } },
    { id: 'shop3', type: 'custom', position: { x: 650, y: 400 }, data: { label: items[5].title, icon: Users, type: 'shop' } },
    { id: 'tmall', type: 'custom', position: { x: 800, y: 50 }, data: { label: items[7].title, icon: Award, type: 'anchor' } },
    { id: 'user', type: 'custom', position: { x: 950, y: 220 }, data: { label: items[6].title, icon: User, type: 'user' } },
  ];

  const defaultEdges: Edge[] = [
    { id: 'e-content-app', source: 'content', target: 'app', animated: true, type: 'tcm', style: { stroke: '#10B981', strokeWidth: 4 } },
    { id: 'e-tools-app', source: 'tools', target: 'app', animated: true, type: 'tcm', style: { stroke: '#10B981', strokeWidth: 4 } },
    { id: 'e-app-shop2', source: 'app', target: 'shop2', type: 'tcm', style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
    { id: 'e-shop2-user', source: 'shop2', target: 'user', type: 'tcm', style: { stroke: '#B22222', strokeWidth: 5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#B22222' } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ 
      ...params, 
      type: 'tcm', 
      animated: true,
      style: { stroke: '#b22222', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#b22222' }
    }, eds));
  }, [setEdges]);

  return (
    <div className="w-full h-[700px] bg-[#fdfaf5] border-2 border-tcm-ink shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative overflow-hidden group rounded-3xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        connectionLineType={ConnectionLineType.Bezier}
        connectionLineStyle={{ stroke: '#b22222', strokeWidth: 2 }}
        snapToGrid={true}
        snapGrid={[20, 20]}
        defaultEdgeOptions={{ 
            type: 'bezier',
            style: { strokeWidth: 3, stroke: '#1a1a1a' },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#1a1a1a' }
        }}
        className="bg-transparent"
      >
        <Background 
          color="#1a1a1a" 
          gap={40} 
          size={0.8} 
          variant={BackgroundVariant.Lines} 
          className="opacity-5" 
        />
      </ReactFlow>

      {/* Professional Aesthetics: Signature Seal */}
      <div className="absolute bottom-8 right-8 z-30 pointer-events-none group-hover:scale-110 transition-transform duration-700">
         <div className="w-24 h-24 border-4 border-tcm-seal rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-tcm-seal/5" />
            <span className="text-3xl font-serif font-black text-tcm-seal rotate-[-15deg]">素問</span>
            <div className="absolute top-0 left-12 w-px h-full bg-tcm-seal/20" />
            <div className="absolute left-0 top-12 w-full h-px bg-tcm-seal/20" />
         </div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-white/40 z-20" />
    </div>
  );
};

const BusinessLoop = (props: { items: ReportItem[] }) => (
  <ReactFlowProvider>
    <BusinessLoopContent {...props} />
  </ReactFlowProvider>
);

const InteractiveStack = ({ items }: { items: ReportItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Top Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          const Icon = IconMap[item.title] || Cpu;
          const [title] = item.content.split('\n');

          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className={`group p-4 border-2 cursor-pointer transition-all duration-300 flex flex-col gap-3 items-center text-center relative
                ${isActive ? 'bg-white border-tcm-seal shadow-2xl -translate-y-2 z-10 scale-105' : 'bg-tcm-paper-darker border-tcm-border hover:border-tcm-seal/40'}`}
            >
              <div className={`transition-colors duration-300 ${isActive ? 'text-tcm-seal' : 'text-tcm-ink/30 group-hover:text-tcm-seal/60'}`}>
                <Icon size={28} />
              </div>
              <h4 className={`text-sm font-serif font-black tracking-tight leading-tight transition-colors duration-300
                ${isActive ? 'text-tcm-ink' : 'text-tcm-ink/50'}`}>
                {title}
              </h4>
              {isActive && (
                <div className="absolute -bottom-0.5 left-0 right-0 h-1 bg-tcm-seal" />
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content & Wide Image Area */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-tcm-border p-10 shadow-sm flex flex-col gap-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <h3 className="text-3xl font-serif font-black text-tcm-ink flex items-center gap-4">
              {items[activeIndex].content.split('\n')[0]}
              {items[activeIndex].type === 'highlight' && <Seal text="核心" />}
            </h3>
            <p className="text-xl font-serif text-tcm-ink/70 leading-relaxed tracking-wide">
              {items[activeIndex].content.split('\n')[1]}
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end shrink-0">
             <span className="text-xs tracking-[0.6em] text-tcm-ink/20 uppercase font-sans mb-2">Technical Engine</span>
             <div className="w-12 h-1 bg-tcm-seal/20" />
          </div>
        </div>

        <div className="w-full aspect-[21/9] bg-tcm-paper-darker border-2 border-tcm-ink shadow-inner flex flex-col items-center justify-center group overflow-hidden relative">
          {items[activeIndex].imageUrl ? (
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={items[activeIndex].imageUrl} 
                alt={items[activeIndex].title} 
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tcm-ink/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              {/* Corner Accents */}
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/50 z-20" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/50 z-20" />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                <div className="text-[25vw] font-serif rotate-[-5deg]">問</div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-tcm-border flex items-center justify-center text-tcm-border group-hover:border-tcm-seal group-hover:text-tcm-seal transition-all duration-500">
                  <TrendingUp size={32} />
                </div>
                <p className="text-xs uppercase tracking-[0.6em] text-tcm-ink/30 font-sans text-center px-4 transition-colors duration-500 group-hover:text-tcm-seal/60">
                  [ 架构预览: {items[activeIndex].imageUrl} ]
                </p>
              </div>
            </>
          )}
          
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-tcm-border z-30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-tcm-border z-30" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-tcm-border z-30" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-tcm-border z-30" />
        </div>
      </motion.div>
    </div>
  );
};

const InteractiveList = ({ items }: { items: ReportItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      <div className="flex-1 flex flex-col gap-1 w-full">
        {items.map((item, idx) => {
          const Icon = IconMap[item.title] || Activity;
          const isActive = activeIndex === idx;
          const isHighlight = item.type === 'highlight';

          return (
            <div 
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className={`group flex items-center gap-6 p-6 border-b border-tcm-border cursor-pointer transition-all relative overflow-hidden
                ${isActive ? 'bg-white shadow-xl translate-x-4 border-tcm-seal z-10' : 'hover:bg-tcm-paper-darker'}
                ${isHighlight ? 'bg-tcm-seal/[0.02]' : ''}`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-tcm-seal" />
              )}
              
              <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full border transition-all
                ${isActive ? 'bg-tcm-seal text-white border-tcm-seal' : 'bg-transparent text-tcm-ink/30 border-tcm-border group-hover:border-tcm-seal group-hover:text-tcm-seal'}`}>
                <Icon size={24} />
              </div>

              <div className="flex-1">
                {(() => {
                  const [title, ...descParts] = item.content.split('\n');
                  const desc = descParts.join('\n');
                  return (
                    <div className="flex flex-col gap-2">
                      <h4 className={`font-serif text-2xl md:text-3xl tracking-wide font-black transition-colors
                        ${isActive ? 'text-tcm-ink' : 'text-tcm-ink/40 group-hover:text-tcm-ink/80'}`}>
                        {title}
                      </h4>
                      {desc && (
                        <p className={`font-serif text-base md:text-lg tracking-wider leading-relaxed transition-colors
                          ${isActive ? 'text-tcm-ink/80' : 'text-tcm-ink/30 group-hover:text-tcm-ink/50'}`}>
                          {desc}
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>

              {isActive && isHighlight && (
                <div className="text-tcm-seal shrink-0">
                  <Seal text="核心" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="lg:sticky lg:top-32 w-full lg:w-[500px] h-[800px] flex flex-col items-center justify-center p-4 bg-tcm-paper-darker border-2 border-tcm-ink shadow-2xl group overflow-hidden relative">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full flex flex-col items-center justify-center group"
        >
          {items[activeIndex].imageUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
               <img 
                 src={items[activeIndex].imageUrl} 
                 alt={items[activeIndex].title} 
                 className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-tcm-ink/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
               <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-sm border border-tcm-border shadow-xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
                  <p className="text-[10px] font-black tracking-widest text-tcm-ink uppercase text-center">Preview Interface // v1.2</p>
               </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center gap-6 p-8">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md text-tcm-seal mb-4">
                {(() => {
                  const Icon = IconMap[items[activeIndex].title] || Activity;
                  return <Icon size={40} />;
                })()}
              </div>
              <h4 className="font-serif font-bold text-xl tracking-widest text-tcm-ink">
                {items[activeIndex].content.split('\n')[0]}
              </h4>
              <div className="h-0.5 w-12 bg-tcm-seal" />
              <p className="text-xs uppercase tracking-[0.4em] text-tcm-ink/30 font-sans leading-relaxed">
                [ 插图占位: {items[activeIndex].imageUrl} ]
              </p>
              <div className="absolute inset-4 border border-tcm-border/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/5 pointer-events-none" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const InteractiveSplit = ({ items }: { items: ReportItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white rounded-sm">
      <div className="w-full md:w-1/2 flex flex-col">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          const [title, ...descParts] = item.content.split('\n');
          const desc = descParts.join('\n');
          
          return (
            <div 
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className={`p-8 cursor-pointer transition-all border-b border-tcm-border last:border-b-0 relative overflow-hidden
                ${isActive ? 'bg-tcm-paper-darker' : 'hover:bg-tcm-paper-darker/50'}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-tcm-seal"
                />
              )}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-sans font-black tracking-[0.3em] text-tcm-ink/30 uppercase">
                  {item.title}
                </span>
                <h4 className={`font-serif text-3xl font-black transition-colors ${isActive ? 'text-tcm-ink' : 'text-tcm-ink/40'}`}>
                  {title}
                </h4>
                <p className={`font-serif text-lg leading-relaxed transition-opacity ${isActive ? 'opacity-80' : 'opacity-30'}`}>
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full md:w-1/2 min-h-[400px] bg-tcm-paper-darker relative overflow-hidden group flex items-center justify-center">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {items[activeIndex].imageUrl ? (
            <>
              <img 
                src={items[activeIndex].imageUrl} 
                alt={items[activeIndex].title}
                className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-tcm-paper-darker/20" />
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 text-tcm-ink/20">
               <div className="text-[120px] font-serif">問</div>
               <span className="text-[10px] tracking-[0.5em] uppercase font-sans">Visual Pending</span>
            </div>
          )}
        </motion.div>
        
        {/* Decorative corner */}
        <div className="absolute bottom-6 right-6 w-24 h-24 border-r-2 border-b-2 border-white/30" />
      </div>
    </div>
  );
};

const HorizontalGallery = ({ items, autoHeight = false }: { items: ReportItem[], autoHeight?: boolean }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-visible">
      {/* Scrollable Container */}
      <div className={`flex gap-6 md:gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory ${autoHeight ? 'items-stretch' : 'items-center'}`}>
        {/* Dynamic Left Spacer: Aligns first item with the 1400px project grid */}
        <div className="shrink-0 w-6 md:w-[calc((100vw-min(100vw,1400px))/2+24px)]" />

        {items.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -8 }}
            className={`shrink-0 snap-start cursor-pointer group relative ${autoHeight ? 'h-[500px] md:h-[650px] w-auto' : 'w-[85vw] md:w-[600px]'}`}
            onClick={() => setSelectedImage(item.imageUrl || null)}
          >
            <div className={`${autoHeight ? 'h-full w-auto' : 'aspect-video'} bg-tcm-paper-darker border-2 border-tcm-border overflow-hidden relative shadow-xl transform transition-all duration-500 group-hover:shadow-2xl group-hover:border-tcm-seal/30`}>
               <img 
                 src={item.imageUrl} 
                 alt={item.title}
                 className={`${autoHeight ? 'h-full w-auto object-contain bg-white/50' : 'w-full h-full object-cover'} transition-transform duration-700 group-hover:scale-[1.02]`}
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-tcm-ink/80 via-tcm-ink/20 to-transparent text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-px bg-white/50" />
                    <span className="text-[10px] font-sans font-black tracking-[0.3em] uppercase opacity-70">Visual Scene {idx + 1}</span>
                  </div>
                  {item.title && <h4 className="font-serif text-2xl font-bold mb-1">{item.title}</h4>}
                  {item.content && <p className="text-sm text-white/90 font-sans tracking-wide uppercase">{item.content}</p>}
               </div>
               <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                  <Search size={18} className="text-white" />
               </div>
            </div>
          </motion.div>
        ))}
        {/* Padding for right-side scroll reach */}
        <div className="shrink-0 w-6 md:w-[calc((100vw-min(100vw,1400px))/2+24px)]" />
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-tcm-ink/95 backdrop-blur-xl flex items-center justify-center p-8 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage} 
            className="max-w-full max-h-full object-contain shadow-2xl border-4 border-white/10"
            referrerPolicy="no-referrer"
          />
          <button 
            className="absolute top-10 right-10 text-white hover:text-tcm-seal transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <div className="font-sans font-black text-4xl select-none">×</div>
          </button>
        </motion.div>
      )}
    </div>
  );
};

const SectionHeader = ({ section }: { section: SectionData }) => (
  <div className="flex flex-col mb-8 border-l-4 border-tcm-ink pl-6 py-2">
    <h2 className="text-3xl font-serif font-bold tracking-wider">{section.title}</h2>
    {section.description && (
      <p className="text-tcm-ink/60 font-serif italic mt-1">{section.description}</p>
    )}
  </div>
);

const Card = ({ item }: { item: ReportItem }) => {
  const isMilestone = item.type === 'milestone';
  const isGoal = item.type === 'goal';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-tcm-border relative overflow-hidden group hover:shadow-lg transition-all
        ${isMilestone ? 'ring-1 ring-tcm-seal/20 bg-tcm-seal/[0.02]' : ''}`}
    >
      {isMilestone && (
        <div className="absolute top-0 right-0 p-1 bg-tcm-seal text-white">
          <Milestone size={14} />
        </div>
      )}
      
      <div className="flex items-start gap-3 mb-3">
        {item.type === 'milestone' && <Flag className="text-tcm-seal shrink-0" size={18} />}
        {item.type === 'goal' && <Target className="text-tcm-ink shrink-0" size={18} />}
        {item.type === 'highlight' && <CheckCircle2 className="text-tcm-ink shrink-0" size={18} />}
        <h3 className="font-serif font-bold text-xl leading-snug group-hover:text-tcm-seal transition-colors">
          {item.title}
        </h3>
      </div>
      
      <p className="text-tcm-ink/80 text-sm leading-relaxed font-sans mb-4 whitespace-pre-line">
        {item.content}
      </p>
      
      {item.links && item.links.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-auto">
          {item.links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url}
              className="inline-flex items-center gap-1.5 text-xs text-tcm-ink/60 hover:text-tcm-seal decoration-tcm-seal underline underline-offset-4"
            >
              <LinkIcon size={12} />
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Ink stroke accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-black/[0.02] -rotate-45 pointer-events-none" />
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-tcm-bg selection:bg-tcm-seal selection:text-white pb-32">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden border-b border-tcm-border">
        {/* Background Decorative */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-20 left-10 text-[20vw] font-serif select-none pointer-events-none rotate-12">素</div>
          <div className="absolute bottom-20 right-10 text-[20vw] font-serif select-none pointer-events-none -rotate-12">問</div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-6"
        >
          <div className="flex items-center justify-center mb-12">
            <Seal text="素问" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black tracking-[0.2em] text-tcm-ink mb-6">
            「素问」项目计划
          </h1>
          <div className="h-0.5 w-32 bg-tcm-seal mx-auto mb-8" />
          <p className="text-xl md:text-2xl font-serif text-tcm-ink/70 italic tracking-widest uppercase">
            Project Strategic Report 2026
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex flex-col items-center gap-4 text-tcm-ink/40"
          >
            <TrendingUp className="animate-bounce" size={24} />
            <span className="text-xs tracking-[0.4em] uppercase font-sans">向下滚动探索</span>
          </motion.div>
        </motion.div>

        {/* Vertical Rail Text */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="writing-vertical-rl rotate-180 text-xs tracking-[0.5em] text-tcm-ink/30 uppercase font-sans">
            TRADITIONAL WISDOM & DIGITAL FUTURE
          </div>
        </div>
      </header>

      {/* Timeline Sticky Header */}
      <nav className="sticky top-0 z-50 bg-tcm-bg/80 backdrop-blur-md border-b border-tcm-border">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="font-serif font-bold text-xl flex items-center gap-2">
            <div className="w-6 h-6 bg-tcm-ink rounded-full" />
            素问
          </div>
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {TIMELINE.map((period) => (
              <a 
                key={period} 
                href={`#${period}`}
                className="text-sm font-sans tracking-widest uppercase text-tcm-ink/60 hover:text-tcm-seal transition-colors font-medium whitespace-nowrap py-1 border-b border-transparent hover:border-tcm-seal"
              >
                {period}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Grid Content */}
      <main className="max-w-[1400px] mx-auto px-6 mt-20">
        {REPORT_DATA.map((section, sIdx) => (
          <section key={section.id} id={section.id} className="mb-24">
            <SectionHeader section={section} />
            
            {section.layout === 'typography' && (
              <div className="flex flex-col md:flex-row gap-12 w-full">
                <div className="flex flex-col gap-8 flex-1">
                  {section.items.map((item, idx) => {
                    const isDivider = item.title === 'divider';
                    const isConclusion = item.title === 'conclusion';
                    const isBrand = item.title === 'brand';
                    const isGoal = item.title === 'goal';
                    const isAnalogy = item.title === 'analogy';
                    const isSubtitle = item.title === 'subtitle';
                    const isSubtitleRed = item.title === 'subtitle-red';
                    const isWarning = item.title === 'warning';
                    const isHighlightTitle = item.title === 'highlight-title';
                    const isImagePlaceholder = item.title === 'image-placeholder';
                    const isInlineGallery = item.title === 'inline-gallery';
                    const isConclusionSmall = item.title === 'conclusion-small';
                    const isSub = item.title === 'sub';

                    if (isDivider) {
                      return (
                        <div key={idx} className="text-tcm-border text-2xl font-serif max-w-4xl">
                          {item.content}
                        </div>
                      );
                    }

                    if (isInlineGallery && item.images) {
                      return (
                        <div key={idx} className="w-screen relative left-1/2 -ml-[50vw] right-1/2 -mr-[50vw] py-16 bg-tcm-paper-darker/40 my-12 border-y border-tcm-border/50">
                          <HorizontalGallery 
                            autoHeight
                            items={item.images.map(img => ({ 
                              title: '', 
                              content: '', 
                              imageUrl: img 
                            }))} 
                          />
                        </div>
                      );
                    }

                    if (isImagePlaceholder) {
                      return (
                        <div key={idx} className="w-full max-w-4xl aspect-video bg-tcm-paper-darker border border-dashed border-tcm-border flex flex-col items-center justify-center gap-4 group hover:bg-white transition-colors p-8">
                          <div className="w-12 h-12 rounded-full border border-tcm-border flex items-center justify-center text-tcm-border group-hover:text-tcm-seal group-hover:border-tcm-seal transition-colors">
                            <TrendingUp size={24} />
                          </div>
                          <span className="text-xs tracking-[0.4em] uppercase font-sans text-tcm-ink/30 group-hover:text-tcm-seal transition-colors">
                            [ 插图占位: {item.content} ]
                          </span>
                        </div>
                      );
                    }

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={`font-serif tracking-widest max-w-4xl ${
                          isConclusion ? 'text-xl text-tcm-seal font-bold mt-4' : 
                          isBrand ? 'text-4xl md:text-5xl font-black text-tcm-ink mt-2' :
                          isConclusionSmall ? 'text-xl text-tcm-seal/80 font-bold italic mt-2' :
                          isAnalogy ? 'text-xl text-tcm-ink/50 italic mt-4 border-l-2 border-tcm-border pl-6' :
                          isSubtitle ? 'text-2xl font-bold text-tcm-ink/80 mt-8 mb-2 border-b border-tcm-border pb-2 inline-block' :
                          isSubtitleRed ? 'text-2xl font-bold text-tcm-seal mt-8 mb-2 border-b border-tcm-seal pb-2 inline-block' :
                          isWarning ? 'text-xl text-tcm-seal/80 font-sans italic py-4 bg-tcm-seal/5 px-6 border-l-4 border-tcm-seal' :
                          isHighlightTitle ? 'text-2xl font-bold text-tcm-ink mt-6 mb-1' :
                          isGoal ? 'text-2xl text-tcm-ink/80 font-bold' :
                          isSub ? 'text-lg text-amber-800/70 italic pl-8 -mt-4 mb-2' :
                          'text-xl md:text-2xl text-tcm-ink/90 leading-relaxed'
                        }`}
                      >
                        {item.content}
                      </motion.div>
                    );
                  })}
                </div>
                {section.sideImage && (
                  <div className="w-full md:w-[400px] shrink-0">
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="sticky top-24"
                    >
                      <img 
                        src={section.sideImage} 
                        alt="Section Visual"
                        className="w-full h-auto object-cover shadow-2xl border border-tcm-border"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>
                )}
              </div>
            )}

            {section.layout === 'interactive-list' && (
              <InteractiveList items={section.items} />
            )}

            {section.layout === 'interactive-stack' && (
              <InteractiveStack items={section.items} />
            )}

            {section.layout === 'interactive-split' && (
              <InteractiveSplit items={section.items} />
            )}

            {section.layout === 'horizontal-gallery' && (
              <div className="w-screen relative left-1/2 -ml-[50vw] right-1/2 -mr-[50vw] py-16 bg-tcm-paper-darker/40 border-y border-tcm-border/50">
                <HorizontalGallery autoHeight items={section.items} />
              </div>
            )}

            {section.layout === 'diagram' && (
              <Diagram items={section.items} />
            )}

            {section.layout === 'business-loop' && (
              <BusinessLoop items={section.items} />
            )}

            {section.layout === 'full' && (
              <div className="grid grid-cols-1 gap-6">
                {section.items.map((item, idx) => (
                  <div key={idx}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            )}

            {section.layout === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, idx) => (
                  <div key={idx}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            )}

            {section.layout === 'flex' && (
              <div className="flex flex-wrap gap-6">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex-1 min-w-[300px]">
                    <Card item={item} />
                  </div>
                ))}
              </div>
            )}

            {section.layout === 'timeline' && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 border-t border-tcm-border pt-8 relative">
                {TIMELINE.map((period) => {
                  const itemsInPeriod = section.items.filter(item => {
                    if (Array.isArray(item.period)) return item.period.includes(period);
                    return item.period === period;
                  });

                  return (
                    <div key={period} id={period} className="flex flex-col gap-6 group">
                      <div className="text-xs font-serif font-bold text-tcm-ink/30 uppercase tracking-[0.2em] mb-2 group-hover:text-tcm-seal transition-colors">
                        {period}
                      </div>
                      <div className="flex flex-col gap-4">
                        {itemsInPeriod.map((item, idx) => (
                          <div key={idx}>
                            <Card item={item} />
                          </div>
                        ))}
                        {itemsInPeriod.length === 0 && (
                          <div className="h-32 border border-dashed border-tcm-border rounded-lg flex items-center justify-center opacity-20">
                            <span className="text-[10px] uppercase tracking-widest">待规划</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-tcm-border mt-32 py-16 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center">
          <Seal text="素问" />
          <p className="mt-8 text-tcm-ink/40 font-serif text-sm tracking-widest text-center max-w-lg leading-loose">
            夫上古圣人之教下也，皆谓之虚邪贼风，避之有时，恬惔虚无，真气从之，精神内守，病安从来。<br/>
            ——《黄帝内经·素问》
          </p>
          <div className="mt-12 h-0.5 w-12 bg-tcm-border" />
          <p className="mt-8 font-sans text-[10px] tracking-[0.4em] uppercase opacity-30">
            © 2026 SU WEN PROJECT STRATEGY GROUP
          </p>
        </div>
      </footer>
    </div>
  );
}
