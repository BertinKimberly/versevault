import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Custom node styles with improved visibility
const nodeStyles = {
  root: {
    background: "linear-gradient(45deg, #3A59D1, #5a77de)",
    color: "white",
    border: "2px solid white",
    boxShadow: "0 5px 15px rgba(58, 89, 209, 0.4)",
    borderRadius: "12px",
    padding: "20px",
    width: "200px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  primary: {
    background: "linear-gradient(45deg, #253380, #3A59D1)",
    color: "white",
    border: "1px solid #c4d4ff",
    boxShadow: "0 3px 10px rgba(37, 51, 128, 0.3)",
    borderRadius: "10px",
    padding: "15px",
    width: "180px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
  secondary: {
    background: "linear-gradient(45deg, #1c2761, #253380)",
    color: "white",
    border: "1px solid #5a77de",
    boxShadow: "0 2px 8px rgba(28, 39, 97, 0.3)",
    borderRadius: "8px",
    padding: "12px",
    width: "160px",
    textAlign: "center",
    fontSize: "14px",
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

export default function LargeMindmap() {
  // Define spiritual growth data
  const initialNodes = [
    {
      id: "root",
      position: { x: 400, y: 300 },
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
      position: { x: 100, y: 100 },
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
      position: { x: -100, y: 0 },
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
      position: { x: -50, y: -100 },
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
    {
      id: "faith-perseverance",
      position: { x: -150, y: -50 },
      data: {
        label: "Perseverance",
        description: "Standing firm in faith through trials",
        scripture: {
          reference: "James 1:3-4",
          text: "Because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.",
        },
      },
      type: "secondary",
      style: nodeStyles.secondary,
    },
    // Prayer branch
    {
      id: "prayer",
      position: { x: 700, y: 100 },
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
      position: { x: 850, y: 0 },
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
      position: { x: 900, y: -100 },
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
    {
      id: "prayer-thanksgiving",
      position: { x: 950, y: -50 },
      data: {
        label: "Thanksgiving",
        description: "Expressing gratitude to God",
        scripture: {
          reference: "1 Thessalonians 5:16-18",
          text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
        },
      },
      type: "secondary",
      style: nodeStyles.secondary,
    },
    // Scripture branch
    {
      id: "scripture",
      position: { x: 100, y: 500 },
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
      position: { x: -50, y: 600 },
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
      position: { x: 0, y: 700 },
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
    {
      id: "scripture-application",
      position: { x: -100, y: 650 },
      data: {
        label: "Application",
        description: "Putting God's Word into practice",
        scripture: {
          reference: "James 1:22",
          text: "Do not merely listen to the word, and so deceive yourselves. Do what it says.",
        },
      },
      type: "secondary",
      style: nodeStyles.secondary,
    },
    // Community branch
    {
      id: "community",
      position: { x: 700, y: 500 },
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
      position: { x: 850, y: 600 },
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
      position: { x: 800, y: 700 },
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
    {
      id: "community-accountability",
      position: { x: 900, y: 650 },
      data: {
        label: "Accountability",
        description: "Supporting each other in spiritual growth",
        scripture: {
          reference: "Proverbs 27:17",
          text: "As iron sharpens iron, so one person sharpens another.",
        },
      },
      type: "secondary",
      style: nodeStyles.secondary,
    },
    // Character branch
    {
      id: "character",
      position: { x: 400, y: 650 },
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
      position: { x: 350, y: 800 },
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
      position: { x: 450, y: 800 },
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
    {
      id: "character-holiness",
      position: { x: 400, y: 900 },
      data: {
        label: "Holiness",
        description: "Setting yourself apart for God",
        scripture: {
          reference: "1 Peter 1:15-16",
          text: "But just as he who called you is holy, so be holy in all you do; for it is written: 'Be holy, because I am holy.'",
        },
      },
      type: "secondary",
      style: nodeStyles.secondary,
    },
    // Witness branch
    {
      id: "witness",
      position: { x: 700, y: -200 },
      data: {
        label: "Witness",
        description: "Sharing your faith with others",
        scripture: {
          reference: "Matthew 28:19-20",
          text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.",
        },
      },
      type: "primary",
      style: nodeStyles.primary,
    },
    {
      id: "witness-evangelism",
      position: { x: 850, y: -300 },
      data: {
        label: "Evangelism",
        description: "Sharing the gospel with others",
        scripture: {
          reference: "Mark 16:15",
          text: "He said to them, 'Go into all the world and preach the gospel to all creation.'",
        },
      },
      type: "secondary",
      style: nodeStyles.secondary,
    },
    {
      id: "witness-testimony",
      position: { x: 800, y: -400 },
      data: {
        label: "Testimony",
        description: "Sharing what God has done in your life",
        scripture: {
          reference: "1 Peter 3:15",
          text: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.",
        },
      },
      type: "secondary",
      style: nodeStyles.secondary,
    },
    // Testing branch
    {
      id: "testing",
      position: { x: 100, y: -200 },
      data: {
        label: "Testing",
        description: "Growing through trials and challenges",
        scripture: {
          reference: "James 1:2-4",
          text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.",
        },
      },
      type: "primary",
      style: nodeStyles.primary,
    },
    {
      id: "testing-trials",
      position: { x: -50, y: -300 },
      data: {
        label: "Trials",
        description: "Facing difficulties with faith",
        scripture: {
          reference: "1 Peter 1:6-7",
          text: "In all this you greatly rejoice, though now for a little while you may have had to suffer grief in all kinds of trials. These have come so that the proven genuineness of your faith—of greater worth than gold, which perishes even though refined by fire—may result in praise, glory and honor when Jesus Christ is revealed.",
        },
      },
      type: "secondary",
      style: nodeStyles.secondary,
    },
    {
      id: "testing-endurance",
      position: { x: 0, y: -400 },
      data: {
        label: "Endurance",
        description: "Persevering through hardship",
        scripture: {
          reference: "Romans 5:3-5",
          text: "Not only so, but we also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope. And hope does not put us to shame, because God's love has been poured out into our hearts through the Holy Spirit, who has been given to us.",
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
    {
      id: "root-witness",
      source: "root",
      target: "witness",
      animated: true,
      style: edgeStyles.primary,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "root-testing",
      source: "root",
      target: "testing",
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
    {
      id: "faith-perseverance",
      source: "faith",
      target: "faith-perseverance",
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
    {
      id: "prayer-thanksgiving",
      source: "prayer",
      target: "prayer-thanksgiving",
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
    {
      id: "scripture-application",
      source: "scripture",
      target: "scripture-application",
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
    {
      id: "community-accountability",
      source: "community",
      target: "community-accountability",
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
    {
      id: "character-holiness",
      source: "character",
      target: "character-holiness",
      style: edgeStyles.secondary,
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Connect witness to its children
    {
      id: "witness-evangelism",
      source: "witness",
      target: "witness-evangelism",
      style: edgeStyles.secondary,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "witness-testimony",
      source: "witness",
      target: "witness-testimony",
      style: edgeStyles.secondary,
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Connect testing to its children
    {
      id: "testing-trials",
      source: "testing",
      target: "testing-trials",
      style: edgeStyles.secondary,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "testing-endurance",
      source: "testing",
      target: "testing-endurance",
      style: edgeStyles.secondary,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showScripture, setShowScripture] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const [viewportCenter, setViewportCenter] = useState({ x: 400, y: 300 });

  // Handle node click to show details
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setShowScripture(false);
  }, []);

  // Handle viewport change
  const onMoveEnd = useCallback((viewport) => {
    setZoom(viewport.zoom);
    setViewportCenter({
      x: viewport.x + window.innerWidth / 2 / viewport.zoom,
      y: viewport.y + window.innerHeight / 2 / viewport.zoom,
    });
  }, []);

  // Filter nodes by category
  const filterNodesByCategory = (category) => {
    if (category === "all") {
      return setNodes(initialNodes);
    }
    
    // First, identify the primary node with the given id
    const primaryNode = initialNodes.find((node) => node.id === category);
    
    if (!primaryNode) return;
    
    // Find all edges connected to this primary node
    const relatedEdges = initialEdges.filter(
      (edge) => edge.source === category || edge.target === category
    );
    
    // Get IDs of all nodes connected to this primary node
    const relatedNodeIds = new Set();
    relatedNodeIds.add(category);
    relatedNodeIds.add("root");
    
    relatedEdges.forEach((edge) => {
      relatedNodeIds.add(edge.source);
      relatedNodeIds.add(edge.target);
    });
    
    // Filter nodes
    const filteredNodes = initialNodes.filter((node) => 
      relatedNodeIds.has(node.id)
    );
    
    setNodes(filteredNodes);
  };

  const zoomToNode = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      // First, ensure the node is in the viewport
      setViewportCenter({ x: node.position.x, y: node.position.y });
      
      // Then set the node as selected
      setSelectedNode(node);
      setShowScripture(false);
    }
  };

  // Render help tooltip
  const renderHelp = () => (
    <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-blue-300/30 text-white/90 text-sm shadow-lg z-10 max-w-md">
      <h4 className="font-bold mb-2 text-white">Navigation Tips</h4>
      <ul className="list-disc pl-5 space-y-1">
        <li>Use mouse wheel to zoom in/out</li>
        <li>Click and drag to pan across the mindmap</li>
        <li>Click nodes to view details</li>
        <li>Use controls in the bottom right</li>
        <li>Use the category filters above to focus on specific areas</li>
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#0f1838]">
      {/* Header with navigation options */}
      <div className="bg-[#253380] px-6 py-4 flex flex-wrap items-center justify-between border-b border-[#5a77de]/30">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <svg 
            className="w-6 h-6 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.172 2.172a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-2.828 0l-2.172-2.172a2 2 0 010-2.828L7.344 11" />
          </svg>
          Spiritual Growth Mindmap
        </h1>
        <div className="flex gap-2 mt-2 md:mt-0 overflow-x-auto pb-2 md:pb-0 flex-nowrap">
          <button 
            onClick={() => filterNodesByCategory("all")}
            className="whitespace-nowrap bg-[#3A59D1]/80 hover:bg-[#3A59D1] text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            All Topics
          </button>
        </div>
      </div>

      {/* Main content area with flow diagram and details panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main diagram area */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onMoveEnd={onMoveEnd}
            fitView
            minZoom={0.1}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
          >
            <Controls position="bottom-right" showInteractive={true} />
            <MiniMap
              nodeStrokeWidth={3}
              style={{
                backgroundColor: "#253380",
                height: 150,
                width: 250,
              }}
              zoomable
              pannable
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
              size={1}
            />
            
            {/* Legend Panel */}
            <Panel position="top-left" className="bg-[#0f1838]/80 backdrop-blur-sm p-3 rounded-lg border border-[#5a77de]/30 text-white">
              <h3 className="font-bold mb-2">Legend</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-[#3A59D1]"></div>
                  <span className="text-sm">Core Concept</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-[#253380]"></div>
                  <span className="text-sm">Main Areas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-[#1c2761]"></div>
                  <span className="text-sm">Specific Practices</span>
                </div>
              </div>
            </Panel>
            
            {/* Quick jump to sections */}
            <Panel position="bottom-left" className="bg-[#0f1838]/80 backdrop-blur-sm p-3 rounded-lg border border-[#5a77de]/30 text-white max-w-xs">
              <h3 className="font-bold mb-2">Quick Navigation</h3>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => zoomToNode("root")}
                  className="text-left text-sm hover:text-blue-300 transition"
                >
                  • Spiritual Growth
                </button>
                <button 
                  onClick={() => zoomToNode("faith")}
                  className="text-left text-sm hover:text-blue-300 transition"
                >
                  • Faith
                </button>
                <button 
                  onClick={() => zoomToNode("prayer")}
                  className="text-left text-sm hover:text-blue-300 transition"
                >
                  • Prayer
                </button>
                <button 
                  onClick={() => zoomToNode("scripture")}
                  className="text-left text-sm hover:text-blue-300 transition"
                >
                  • Scripture
                </button>
                <button 
                  onClick={() => zoomToNode("community")}
                  className="text-left text-sm hover:text-blue-300 transition"
                >
                  • Community
                </button>
                <button 
                  onClick={() => zoomToNode("character")}
                  className="text-left text-sm hover:text-blue-300 transition"
                >
                  • Character
                </button>
                <button 
                  onClick={() => zoomToNode("witness")}
                  className="text-left text-sm hover:text-blue-300 transition"
                >
                  • Witness
                </button>
                <button 
                  onClick={() => zoomToNode("testing")}
                  className="text-left text-sm hover:text-blue-300 transition"
                >
                  • Testing
                </button>
              </div>
            </Panel>

            {/* Current view stats */}
            <Panel position="top-right" className="bg-[#0f1838]/80 backdrop-blur-sm p-2 rounded-lg border border-[#5a77de]/30 text-white">
              <div className="text-xs">
                {/* <div>Zoom: {Math.round(zoom * 100)}%</div> */}
                <div>Nodes: {nodes.length}</div>
              </div>
            </Panel>
          </ReactFlow>
          
          {/* Render help tooltip */}
          {renderHelp()}
        </div>

        {/* Right sidebar for details */}
        {selectedNode && (
          <div className="w-96 bg-[#1c2761] border-l border-[#5a77de]/30 p-6 overflow-y-auto">
            <div className="flex flex-col h-full">
              <button 
                onClick={() => setSelectedNode(null)}
                className="self-end text-white/70 hover:text-white"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-4 mb-6 rounded-lg bg-[#253380]/50 border border-[#5a77de]/30">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedNode.data.label}
                </h3>
                <div className="text-white/80">
                  {selectedNode.data.description}
                </div>
              </div>
              
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
              
              {/* Additional actions */}
              <div className="mt-6 flex gap-2">
                <button 
                  className="flex-1 py-2 px-3 bg-[#3A59D1]/60 hover:bg-[#3A59D1]/80 text-white rounded-md text-sm transition"
                  onClick={() => {
                    const connectedNodes = edges
                      .filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id)
                      .map(edge => edge.source === selectedNode.id ? edge.target : edge.source);
                      
                    const uniqueConnectedNodes = [...new Set(connectedNodes)];
                    
                    const relatedNodes = nodes.filter(node => 
                      uniqueConnectedNodes.includes(node.id) || node.id === selectedNode.id
                    );
                    
                    setNodes(relatedNodes);
                  }}
                >
                  Focus on this topic
                </button>
                <button 
                  className="flex-1 py-2 px-3 bg-[#5a77de]/40 hover:bg-[#5a77de]/60 text-white rounded-md text-sm transition"
                  onClick={() => filterNodesByCategory("all")}
                >
                  Show all topics
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}