import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Fallback Model Component (cube)
const FallbackModel = ({ color, textureData }) => {
  const meshRef = useRef();

  React.useEffect(() => {
    if (meshRef.current && textureData) {
      const textureLoader = new THREE.TextureLoader();
      if (typeof textureData === 'string') {
        // Nếu textureData là string (URL)
        textureLoader.load(textureData, (loadedTexture) => {
          meshRef.current.material.map = loadedTexture;
          meshRef.current.material.needsUpdate = true;
        });
      } else if (textureData.texture) {
        // Nếu textureData là object { texture, color }
        textureLoader.load(textureData.texture, (loadedTexture) => {
          meshRef.current.material.map = loadedTexture;
          if (textureData.color) {
            meshRef.current.material.color.setHex(textureData.color.replace('#', '0x'));
          }
          meshRef.current.material.needsUpdate = true;
        });
      }
    } else if (meshRef.current) {
      // Reset texture nếu không có
      meshRef.current.material.map = null;
      meshRef.current.material.needsUpdate = true;
    }
  }, [textureData]);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Model Component
const Model = ({ color, textureData }) => {
  const [hasError, setHasError] = useState(false);
  
  try {
    const { scene } = useGLTF('/model.glb');
    const meshRef = useRef();

    React.useEffect(() => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh) {
            // Apply color
            if (color) {
              child.material.color.setHex(color.replace('#', '0x'));
            }
            
            // Apply texture
            if (textureData) {
              const textureLoader = new THREE.TextureLoader();
              if (typeof textureData === 'string') {
                // Nếu textureData là string (URL)
                textureLoader.load(textureData, (loadedTexture) => {
                  child.material.map = loadedTexture;
                  child.material.needsUpdate = true;
                });
              } else if (textureData.texture) {
                // Nếu textureData là object { texture, color }
                textureLoader.load(textureData.texture, (loadedTexture) => {
                  child.material.map = loadedTexture;
                  if (textureData.color) {
                    child.material.color.setHex(textureData.color.replace('#', '0x'));
                  }
                  child.material.needsUpdate = true;
                });
              }
            } else {
              // Reset texture nếu không có
              child.material.map = null;
              child.material.needsUpdate = true;
            }
          }
        });
      }
    }, [scene, color, textureData]);

    return <primitive object={scene} ref={meshRef} />;
  } catch (error) {
    console.warn('Model not found, using fallback:', error);
    return <FallbackModel color={color} textureData={textureData} />;
  }
};

// Loading Component
const ModelLoader = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#666666" />
  </mesh>
);

// Customizer UI Component
const CustomizerUI = ({ onColorChange, onTextureChange }) => {
  const [selectedColor, setSelectedColor] = useState('#183F8F');
  const [selectedTexture, setSelectedTexture] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#183F8F');
  const [textureColor, setTextureColor] = useState('#FFFFFF');
  const fileInputRef = useRef();

  // Họa tiết sẵn
  const presetTextures = [
    {
      name: 'Không có',
      value: null,
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vbmU8L3RleHQ+Cjwvc3ZnPgo='
    },
    {
      name: 'Carbon Fiber',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNncmlkKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxwYXRoIGQ9Ik0gMCAxMCBMIDEwIDEwIEwgMTAgMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjgiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+Cjwvc3ZnPgo='
    },
    {
      name: 'Wood Grain',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCN3b29kKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9Indvb2QiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxwYXRoIGQ9Ik0gMCA1IEwgMjAgNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjgiLz4KPHBhdGggZD0iTSAwIDggTCAyMCA4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuNiIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPC9zdmc+Cg=='
    },
    {
      name: 'Leather',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNsZWF0aGVyKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9ImxlYXRoZXIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxjaXJjbGUgY3g9IjcuNSIgY3k9IjcuNSIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuOCIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPC9zdmc+Cg=='
    },
    {
      name: 'Metal',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNtZXRhbCkiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0ibWV0YWwiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjp3aGl0ZTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC41KTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjp3aGl0ZTtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K'
    },
    {
      name: 'Camouflage',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNjYW1vKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9ImNhbW8iIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSIzIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC44Ii8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjQiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjYiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI4IiByPSIyIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC40Ii8+CjwvcGF0dGVybj4KPC9kZWZzPgo8L3N2Zz4K'
    },
    {
      name: 'Geometric',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnZW9tKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9Imdlb20iIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxwYXRoIGQ9Ik0gMCAwIEwgNSA1IEwgMTAgMCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuNiIvPgo8cGF0aCBkPSJNIDAgMTAgTCA1IDUgTCAxMCAxMCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuNiIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPC9zdmc+Cg=='
    },
    {
      name: 'Stars',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNzdGFycykiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJzdGFycyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHBhdGggZD0iTSAxMCAyIEwgMTIgOCBMIDE4IDggTCAxMyAxMiBMIDE1IDE4IEwgMTAgMTQgTCA1IDE4IEwgNyAxMiBMIDIgOCBMIDggOCBaIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC44Ii8+CjwvcGF0dGVybj4KPC9kZWZzPgo8L3N2Zz4K'
    },
    {
      name: 'Dots',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNkb3RzKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjIiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjgiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+Cjwvc3ZnPgo='
    },
    {
      name: 'Lines',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNsaW5lcykiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJsaW5lcyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHBhdGggZD0iTSAwIDUgTCAxMCA1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuNiIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPC9zdmc+Cg=='
    },
    {
      name: 'Grid',
      value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNncmlkMikiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkMiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHBhdGggZD0iTSAwIDAgTCAxMCAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuNCIvPgo8cGF0aCBkPSJNIDAgMCBMIDAgMTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC40Ii8+CjwvcGF0dGVybj4KPC9kZWZzPgo8L3N2Zz4K'
    }
  ];

  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    onColorChange(color);
  };

  const handleCustomColorClick = () => {
    setShowColorPicker(true);
  };

  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    setSelectedColor(color);
    onColorChange(color);
  };

  const handleTextureColorChange = (e) => {
    const color = e.target.value;
    setTextureColor(color);
    // Tạo texture với màu mới
    if (selectedTexture && selectedTexture !== presetTextures[0].value) {
      // Ở đây bạn có thể tạo texture mới với màu đã chọn
      // Hoặc gửi thông tin màu texture riêng biệt
      onTextureChange({ texture: selectedTexture, color: color });
    }
  };

  const handlePresetTextureClick = (texture) => {
    console.log('Selected texture:', texture);
    setSelectedTexture(texture);
    if (texture === null) {
      // Nếu chọn "Không có", gửi null
      console.log('Sending null texture');
      onTextureChange(null);
    } else {
      // Nếu có texture, gửi object với texture và màu
      const textureData = { texture: texture, color: textureColor };
      console.log('Sending texture data:', textureData);
      onTextureChange(textureData);
    }
  };

  const handleTextureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textureUrl = event.target.result;
        setSelectedTexture(textureUrl);
        onTextureChange({ texture: textureUrl, color: textureColor });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveTexture = () => {
    setSelectedTexture(null);
    onTextureChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Tùy biến sản phẩm</h2>
      
      {/* Color Picker - Màu khối 3D */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Màu khối 3D</label>
        <div className="flex items-center space-x-4">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-16 h-12 rounded-lg border-2 border-white/30 cursor-pointer"
          />
          <span className="text-white/80 text-sm">{selectedColor}</span>
        </div>
      </div>

      {/* Texture Color Picker - Màu họa tiết */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Màu họa tiết</label>
        <div className="flex items-center space-x-4">
          <input
            type="color"
            value={textureColor}
            onChange={handleTextureColorChange}
            className="w-16 h-12 rounded-lg border-2 border-white/30 cursor-pointer"
          />
          <span className="text-white/80 text-sm">{textureColor}</span>
        </div>
        <p className="text-white/60 text-xs mt-2">
          Chọn màu cho họa tiết (không ảnh hưởng đến màu khối 3D)
        </p>
      </div>

      {/* Preset Textures */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Họa tiết có sẵn</label>
        <div className="grid grid-cols-4 gap-3">
          {presetTextures.map((texture, index) => (
            <button
              key={index}
              onClick={() => handlePresetTextureClick(texture.value)}
              className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 overflow-hidden ${
                selectedTexture === texture.value 
                  ? 'border-white shadow-lg shadow-white/20' 
                  : 'border-white/30 hover:border-white/60'
              }`}
            >
              <img
                src={texture.preview}
                alt={texture.name}
                className="w-full h-full object-cover"
              />
              {selectedTexture === texture.value && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-white/60 text-xs mt-2">
          Click để chọn họa tiết có sẵn
        </p>
      </div>

      {/* Texture Upload */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Upload họa tiết tùy chỉnh</label>
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleTextureUpload}
            className="block w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-white hover:file:bg-white/30 file:cursor-pointer"
          />
          {selectedTexture && selectedTexture !== presetTextures[0].value && (
            <div className="relative">
              <img
                src={selectedTexture}
                alt="Selected texture"
                className="w-full h-32 object-cover rounded-lg border border-white/30"
              />
              <button
                onClick={handleRemoveTexture}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Current Color Display */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Màu đã chọn</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/20">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-white/30"
              style={{ backgroundColor: selectedColor }}
            ></div>
            <div>
              <p className="text-white font-medium">{selectedColor}</p>
              <p className="text-white/60 text-sm">Màu khối 3D</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/20">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-white/30"
              style={{ backgroundColor: textureColor }}
            ></div>
            <div>
              <p className="text-white font-medium">{textureColor}</p>
              <p className="text-white/60 text-sm">Màu họa tiết</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-medium mb-2">Hướng dẫn sử dụng:</h3>
        <ul className="text-white/70 text-sm space-y-1">
          <li>• Chọn màu khối 3D từ bảng màu hoặc nhập mã HEX</li>
          <li>• Chọn màu họa tiết riêng biệt (không ảnh hưởng khối 3D)</li>
          <li>• Chọn họa tiết từ danh sách có sẵn</li>
          <li>• Hoặc upload ảnh để tạo họa tiết tùy chỉnh</li>
          <li>• Xoay mô hình bằng chuột để xem các góc</li>
          <li>• Zoom bằng cuộn chuột</li>
        </ul>
      </div>

      {/* Model Info */}
      <div className="bg-blue-500/10 rounded-lg p-4 mt-4">
        <h3 className="text-blue-300 font-medium mb-2">Thông tin Model:</h3>
        <p className="text-blue-200 text-sm">
          Đang sử dụng model demo. Để sử dụng model thực tế, hãy thêm file <code className="bg-blue-900/50 px-1 rounded">model.glb</code> vào thư mục <code className="bg-blue-900/50 px-1 rounded">public/</code>
        </p>
      </div>
    </div>
  );
};

// Main Customize Page
const Customize = () => {
  const [modelColor, setModelColor] = useState('#183F8F');
  const [modelTexture, setModelTexture] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-white">Customize 3D</h1>
          <p className="text-white/70 mt-1">Tùy biến sản phẩm của bạn với công nghệ 3D</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* Left Panel - Customizer UI */}
          <div className="lg:order-1 order-2">
            <CustomizerUI
              onColorChange={setModelColor}
              onTextureChange={setModelTexture}
            />
          </div>

          {/* Right Panel - 3D Model */}
          <div className="lg:order-2 order-1 bg-black/20 rounded-2xl border border-white/10 overflow-hidden">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              style={{ height: '100%' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              
              <Suspense fallback={<ModelLoader />}>
                <Model color={modelColor} textureData={modelTexture} />
              </Suspense>
              
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={10}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;