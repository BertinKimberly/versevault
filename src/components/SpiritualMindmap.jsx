import { useState, useCallback, useEffect } from "react";
import {
   ReactFlow,
   MiniMap,
   Controls,
   Background,
   useNodesState,
   useEdgesState,
   MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Custom node styles
const nodeStyles = {
   root: {
      background: "linear-gradient(45deg, #3A59D1, #5a77de)",
      color: "white",
      border: "2px solid white",
      boxShadow: "0 5px 15px rgba(58, 89, 209, 0.4)",
      borderRadius: "12px",
      padding: "20px",
      width: "180px",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
   },
   primary: {
      background: "linear-gradient(45deg, #253380, #3A59D1)",
      color: "white",
      border: "1px solid #c4d4ff",
      boxShadow: "0 3px 10px rgba(37, 51, 128, 0.3)",
      borderRadius: "10px",
      padding: "15px",
      width: "160px",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "bold",
   },
   secondary: {
      background: "linear-gradient(45deg, #1c2761, #253380)",
      color: "white",
      border: "1px solid #5a77de",
      boxShadow: "0 2px 8px rgba(28, 39, 97, 0.3)",
      borderRadius: "8px",
      padding: "12px",
      width: "140px",
      textAlign: "center",
      fontSize: "13px",
      fontWeight: "bold",
   },
};

// Custom edge styles
const edgeStyles = {
   primary: {
      stroke: "#5a77de",
      strokeWidth: 2,
   },
   secondary: {
      stroke: "#c4d4ff",
      strokeWidth: 1.5,
   },
};

export default function SpiritualMindmap() {
   // Define spiritual growth data
   const initialNodes = [
      {
         id: "root",
         position: { x: 400, y: 200 },
         data: {
            label: "Spiritual Growth",
            description:
               "The journey of growing in faith and relationship with God",
            scripture: {
               reference: "2 Peter 3:18",
               text: "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen.",
            },
         },
         type: "root",
         style: nodeStyles.root,
      },
      // Faith branch
      {
         id: "faith",
         position: { x: 150, y: 50 },
         data: {
            label: "Faith",
            description: "Believing in God and His promises for your life",
            scripture: {
               reference: "Hebrews 11:1",
               text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
            },
         },
         type: "primary",
         style: nodeStyles.primary,
      },
      {
         id: "faith-trust",
         position: { x: 0, y: 0 },
         data: {
            label: "Trust",
            description: "Learning to trust God in all circumstances",
            scripture: {
               reference: "Proverbs 3:5-6",
               text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      {
         id: "faith-belief",
         position: { x: 50, y: -80 },
         data: {
            label: "Belief",
            description: "Deepening your belief in God's word",
            scripture: {
               reference: "Mark 9:23",
               text: '"\'If you can\'?" said Jesus. "Everything is possible for one who believes."',
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      // Prayer branch
      {
         id: "prayer",
         position: { x: 600, y: 70 },
         data: {
            label: "Prayer",
            description: "Communicating with God through prayer",
            scripture: {
               reference: "Philippians 4:6-7",
               text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
            },
         },
         type: "primary",
         style: nodeStyles.primary,
      },
      {
         id: "prayer-listening",
         position: { x: 700, y: 0 },
         data: {
            label: "Listening",
            description: "Taking time to listen to God's voice",
            scripture: {
               reference: "1 Samuel 3:10",
               text: 'The LORD came and stood there, calling as at the other times, "Samuel! Samuel!" Then Samuel said, "Speak, for your servant is listening."',
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      {
         id: "prayer-intercession",
         position: { x: 750, y: -80 },
         data: {
            label: "Intercession",
            description: "Praying for others' needs",
            scripture: {
               reference: "1 Timothy 2:1",
               text: "I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people.",
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      // Scripture branch
      {
         id: "scripture",
         position: { x: 200, y: 350 },
         data: {
            label: "Scripture",
            description: "Learning and applying God's Word",
            scripture: {
               reference: "2 Timothy 3:16-17",
               text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.",
            },
         },
         type: "primary",
         style: nodeStyles.primary,
      },
      {
         id: "scripture-study",
         position: { x: 100, y: 450 },
         data: {
            label: "Study",
            description: "Digging deeper into the Bible",
            scripture: {
               reference: "Joshua 1:8",
               text: "Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.",
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      {
         id: "scripture-meditation",
         position: { x: 150, y: 520 },
         data: {
            label: "Meditation",
            description: "Reflecting on God's Word day and night",
            scripture: {
               reference: "Psalm 1:2-3",
               text: "But whose delight is in the law of the LORD, and who meditates on his law day and night. That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither—whatever they do prospers.",
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      // Community branch
      {
         id: "community",
         position: { x: 600, y: 350 },
         data: {
            label: "Community",
            description: "Growing together with other believers",
            scripture: {
               reference: "Hebrews 10:24-25",
               text: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.",
            },
         },
         type: "primary",
         style: nodeStyles.primary,
      },
      {
         id: "community-fellowship",
         position: { x: 700, y: 450 },
         data: {
            label: "Fellowship",
            description: "Sharing life with other believers",
            scripture: {
               reference: "Acts 2:42",
               text: "They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.",
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      {
         id: "community-service",
         position: { x: 650, y: 520 },
         data: {
            label: "Service",
            description: "Using your gifts to serve others",
            scripture: {
               reference: "1 Peter 4:10",
               text: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms.",
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      // Character branch
      {
         id: "character",
         position: { x: 400, y: 450 },
         data: {
            label: "Character",
            description: "Developing Christ-like character",
            scripture: {
               reference: "Galatians 5:22-23",
               text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
            },
         },
         type: "primary",
         style: nodeStyles.primary,
      },
      {
         id: "character-fruit",
         position: { x: 350, y: 550 },
         data: {
            label: "Fruit of the Spirit",
            description: "Growing in spiritual virtues",
            scripture: {
               reference: "John 15:5",
               text: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.",
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
      {
         id: "character-transformation",
         position: { x: 450, y: 550 },
         data: {
            label: "Transformation",
            description: "Being transformed by renewing your mind",
            scripture: {
               reference: "Romans 12:2",
               text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is—his good, pleasing and perfect will.",
            },
         },
         type: "secondary",
         style: nodeStyles.secondary,
      },
   ];

   const initialEdges = [
      // Connect root to primary nodes
      {
         id: "root-faith",
         source: "root",
         target: "faith",
         animated: true,
         style: edgeStyles.primary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "root-prayer",
         source: "root",
         target: "prayer",
         animated: true,
         style: edgeStyles.primary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "root-scripture",
         source: "root",
         target: "scripture",
         animated: true,
         style: edgeStyles.primary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "root-community",
         source: "root",
         target: "community",
         animated: true,
         style: edgeStyles.primary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "root-character",
         source: "root",
         target: "character",
         animated: true,
         style: edgeStyles.primary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },

      // Connect faith to its children
      {
         id: "faith-trust",
         source: "faith",
         target: "faith-trust",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "faith-belief",
         source: "faith",
         target: "faith-belief",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },

      // Connect prayer to its children
      {
         id: "prayer-listening",
         source: "prayer",
         target: "prayer-listening",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "prayer-intercession",
         source: "prayer",
         target: "prayer-intercession",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },

      // Connect scripture to its children
      {
         id: "scripture-study",
         source: "scripture",
         target: "scripture-study",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "scripture-meditation",
         source: "scripture",
         target: "scripture-meditation",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },

      // Connect community to its children
      {
         id: "community-fellowship",
         source: "community",
         target: "community-fellowship",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "community-service",
         source: "community",
         target: "community-service",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },

      // Connect character to its children
      {
         id: "character-fruit",
         source: "character",
         target: "character-fruit",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
         id: "character-transformation",
         source: "character",
         target: "character-transformation",
         style: edgeStyles.secondary,
         markerEnd: { type: MarkerType.ArrowClosed },
      },
   ];

   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const [selectedNode, setSelectedNode] = useState(null);
   const [showScripture, setShowScripture] = useState(false);

   // Handle node click to show details
   const onNodeClick = useCallback((event, node) => {
      setSelectedNode(node);
      setShowScripture(false);
   }, []);

   // Auto-arrange nodes on initial load
   useEffect(() => {
      // For real implementations, you might want to use a layout algorithm like dagre
      // This is just a simple initialization to ensure the component works
      setNodes((nds) => {
         return nds.map((node) => {
            return node;
         });
      });
   }, [setNodes]);

   return (
      <div className="flex flex-col md:flex-row gap-6 h-[600px]">
         {/* ReactFlow Canvas */}
         <div className="w-full md:w-2/3 h-full bg-[#1c2761]/40 rounded-lg border border-[#5a77de]/30 overflow-hidden">
            <ReactFlow
               nodes={nodes}
               edges={edges}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               onNodeClick={onNodeClick}
               fitView
               attributionPosition="bottom-left"
            >
               <Controls position="bottom-right" />
               <MiniMap
                  nodeStrokeWidth={3}
                  style={{
                     backgroundColor: "#253380",
                     height: 120,
                     width: 200,
                  }}
                  nodeColor={(node) => {
                     switch (node.type) {
                        case "root":
                           return "#3A59D1";
                        case "primary":
                           return "#5a77de";
                        default:
                           return "#7dabff";
                     }
                  }}
               />
               <Background
                  color="#c4d4ff"
                  gap={16}
                  variant="dots"
               />
            </ReactFlow>
         </div>

         {/* Details Panel */}
         <div className="w-full md:w-1/3 bg-[#253380]/40 border border-[#5a77de]/30 p-6 rounded-lg backdrop-blur-sm">
            {selectedNode ? (
               <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-white mb-2">
                     {selectedNode.data.label}
                  </h3>
                  <p className="text-white/80 mb-6">
                     {selectedNode.data.description}
                  </p>

                  <div className="mt-auto">
                     <button
                        onClick={() => setShowScripture(!showScripture)}
                        className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                     >
                        <span>
                           {showScripture ? "Hide Scripture" : "Show Scripture"}
                        </span>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className={`h-5 w-5 transition-transform duration-300 ${
                              showScripture ? "rotate-180" : ""
                           }`}
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                           />
                        </svg>
                     </button>

                     {showScripture && selectedNode.data.scripture && (
                        <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20 transition-all">
                           <p className="text-white/90 italic mb-2">
                              "{selectedNode.data.scripture.text}"
                           </p>
                           <p className="text-white/70 font-semibold text-right">
                              — {selectedNode.data.scripture.reference}
                           </p>
                        </div>
                     )}
                  </div>

                  <div className="mt-6 text-white/50 text-sm">
                     <p>Click and drag to move the mindmap</p>
                     <p>Click on nodes to see more details</p>
                  </div>
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-[#3A59D1]/30 flex items-center justify-center mb-4">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white/70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                     </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                     Interactive Mindmap
                  </h3>
                  <p className="text-white/70">
                     Click on any node to explore spiritual growth aspects and
                     related scriptures
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
