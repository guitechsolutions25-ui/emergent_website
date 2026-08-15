import { useCallback, useMemo, useState } from "react";
import { ReactFlow, Background, Controls, MiniMap, Handle, Position, applyNodeChanges } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus, MousePointerClick } from "lucide-react";
import { flowNodes, flowEdges, flowKindMeta } from "@/data/mock";

function KromeraNode({ data, selected }) {
  return (
    <div
      className={`w-[200px] rounded-xl border bg-[#141417] px-3.5 py-2.5 text-left shadow-xl shadow-black/40 transition-all duration-200 ${
        selected ? "border-teal shadow-[0_0_24px_rgba(0,217,165,0.2)]" : "border-white/10"
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <p className="font-mono text-[9px] font-medium uppercase tracking-[0.18em]" style={{ color: data.color }}>
        {data.kind}
      </p>
      <p className="mt-1 text-[12px] font-semibold leading-snug text-zinc-100">{data.label}</p>
      {data.hint && <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-zinc-500">{data.hint}</p>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = { kromera: KromeraNode };

const initialNodes = flowNodes.map((n) => ({
  id: n.id,
  type: "kromera",
  position: { x: n.x, y: n.y },
  data: { kind: n.kind, label: n.label, hint: n.hint, color: flowKindMeta[n.kind].color },
}));

const baseEdges = flowEdges.map((e) => ({
  ...e,
  type: "smoothstep",
  label: e.label,
}));

export default function FlowDemo() {
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedId, setSelectedId] = useState("menu");
  const [counter, setCounter] = useState(0);

  const onNodesChange = useCallback((changes) => setNodes((ns) => applyNodeChanges(changes, ns)), []);

  const edges = useMemo(
    () =>
      baseEdges.map((e) => {
        const active = e.source === selectedId || e.target === selectedId;
        return { ...e, animated: active, className: active ? "active" : "" };
      }),
    [selectedId]
  );

  const nodesWithSelection = useMemo(
    () => nodes.map((n) => ({ ...n, selected: n.id === selectedId })),
    [nodes, selectedId]
  );

  const selected = nodes.find((n) => n.id === selectedId);

  const addNode = (kind) => {
    const id = `custom-${counter}`;
    setCounter((c) => c + 1);
    setNodes((ns) => [
      ...ns,
      {
        id,
        type: "kromera",
        position: { x: -80 + Math.random() * 160, y: -140 - Math.random() * 60 },
        data: { kind, label: `Novo nó · ${kind}`, hint: flowKindMeta[kind].desc, color: flowKindMeta[kind].color },
      },
    ]);
    setSelectedId(id);
  };

  return (
    <div className="relative" data-testid="flow-demo">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-steel">Adicionar nó:</span>
        {Object.keys(flowKindMeta).map((kind) => (
          <button
            key={kind}
            data-testid={`flow-add-${kind.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            onClick={() => addNode(kind)}
            className="flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] transition-transform duration-200 hover:scale-[1.04]"
            style={{ borderColor: `${flowKindMeta[kind].color}55`, color: flowKindMeta[kind].color }}
          >
            <Plus className="h-3 w-3" />
            {kind}
          </button>
        ))}
      </div>

      <div className="relative h-[560px]">
        <ReactFlow
          nodes={nodesWithSelection}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodeClick={(_, node) => setSelectedId(node.id)}
          onPaneClick={() => setSelectedId(null)}
          fitView
          minZoom={0.4}
          maxZoom={1.6}
          data-testid="flow-canvas"
        >
          <Background color="rgba(255,255,255,0.06)" gap={22} size={1.5} />
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable className="!h-24 !w-36" nodeColor="#1e1e22" maskColor="rgba(13,13,15,0.7)" />
        </ReactFlow>

        <div className="glass absolute right-3 top-3 w-[240px] rounded-xl border border-line p-4" data-testid="flow-node-panel">
          {selected ? (
            <>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: selected.data.color }}>
                {selected.data.kind}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">{selected.data.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-steel">{flowKindMeta[selected.data.kind]?.desc}</p>
              {selected.data.hint && (
                <div className="mt-3 rounded-lg border border-line bg-ink/60 p-2.5 font-mono text-[10px] leading-relaxed text-steel">
                  {selected.data.hint}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-start gap-2.5 text-xs text-steel">
              <MousePointerClick className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              Clique em um nó para ver sua configuração. Arraste para mover, use o scroll para zoom.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
