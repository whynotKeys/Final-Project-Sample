"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";

const FULL_KEYBOARD_LAYOUT = [
  // 숫자 행
  [
    { key: "ESC", width: 1 },
    { key: "", width: 0.5 }, // 간격
    { key: "F1", width: 1 },
    { key: "F2", width: 1 },
    { key: "F3", width: 1 },
    { key: "F4", width: 1 },
    { key: "", width: 0.5 },
    { key: "F5", width: 1 },
    { key: "F6", width: 1 },
    { key: "F7", width: 1 },
    { key: "F8", width: 1 },
    { key: "", width: 0.5 },
    { key: "F9", width: 1 },
    { key: "F10", width: 1 },
    { key: "F11", width: 1 },
    { key: "F12", width: 1 },
  ],
  [
    { key: "`", width: 1 },
    { key: "1", width: 1 },
    { key: "2", width: 1 },
    { key: "3", width: 1 },
    { key: "4", width: 1 },
    { key: "5", width: 1 },
    { key: "6", width: 1 },
    { key: "7", width: 1 },
    { key: "8", width: 1 },
    { key: "9", width: 1 },
    { key: "0", width: 1 },
    { key: "-", width: 1 },
    { key: "=", width: 1 },
    { key: "BACKSPACE", width: 2 },
  ],
  // QWERTY 행
  [
    { key: "TAB", width: 1.5 },
    { key: "Q", width: 1 },
    { key: "W", width: 1 },
    { key: "E", width: 1 },
    { key: "R", width: 1 },
    { key: "T", width: 1 },
    { key: "Y", width: 1 },
    { key: "U", width: 1 },
    { key: "I", width: 1 },
    { key: "O", width: 1 },
    { key: "P", width: 1 },
    { key: "[", width: 1 },
    { key: "]", width: 1 },
    { key: "\\", width: 1.5 },
  ],
  // ASDF 행
  [
    { key: "CAPS", width: 1.75 },
    { key: "A", width: 1 },
    { key: "S", width: 1 },
    { key: "D", width: 1 },
    { key: "F", width: 1 },
    { key: "G", width: 1 },
    { key: "H", width: 1 },
    { key: "J", width: 1 },
    { key: "K", width: 1 },
    { key: "L", width: 1 },
    { key: ";", width: 1 },
    { key: "'", width: 1 },
    { key: "ENTER", width: 2.25 },
  ],
  // ZXCV 행
  [
    { key: "SHIFT", width: 2.25 },
    { key: "Z", width: 1 },
    { key: "X", width: 1 },
    { key: "C", width: 1 },
    { key: "V", width: 1 },
    { key: "B", width: 1 },
    { key: "N", width: 1 },
    { key: "M", width: 1 },
    { key: ",", width: 1 },
    { key: ".", width: 1 },
    { key: "/", width: 1 },
    { key: "SHIFT", width: 2.75 },
  ],
  // 하단 행
  [
    { key: "CTRL", width: 1.25 },
    { key: "WIN", width: 1.25 },
    { key: "ALT", width: 1.25 },
    { key: "SPACE", width: 6.25 },
    { key: "ALT", width: 1.25 },
    { key: "WIN", width: 1.25 },
    { key: "MENU", width: 1.25 },
    { key: "CTRL", width: 1.25 },
  ],
];

interface FallingKey {
  id: string;
  letter: string;
  x: number;
  y: number;
  finalX: number;
  finalY: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  width: number;
  isLanded: boolean;
}

interface StackedKey {
  id: string;
  letter: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
}

export default function KeyboardShake() {
  const [fallingKeys, setFallingKeys] = useState<FallingKey[]>([]);
  const [stackedKeys, setStackedKeys] = useState<StackedKey[]>([]);
  const [removedKeys, setRemovedKeys] = useState<Set<string>>(new Set());
  const keyboardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastShakeTime = useRef<number>(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  // 바닥 높이 계산
  const getFloorHeight = () => {
    if (typeof window !== "undefined") {
      return window.innerHeight - 100; // 화면 하단에서 100px 위
    }
    return 600;
  };

  // 키가 착지할 위치 계산 (다른 키들과 겹치지 않도록)
  const calculateLandingPosition = useCallback(
    (newKey: FallingKey, existingKeys: StackedKey[]) => {
      const floorHeight = getFloorHeight();
      const keyHeight = 48;
      const keyWidth = newKey.width * 48;

      // 목표 X 위치 (약간의 랜덤성 추가)
      let targetX = newKey.x + newKey.velocityX * 0.1;

      // 화면 경계 체크
      const screenWidth =
        typeof window !== "undefined" ? window.innerWidth : 1200;
      targetX = Math.max(
        keyWidth / 2,
        Math.min(screenWidth - keyWidth / 2, targetX)
      );

      // 해당 X 위치에서 가장 높은 키 찾기
      let targetY = floorHeight - keyHeight;

      const nearbyKeys = existingKeys.filter((key) => {
        const distance = Math.abs(key.x - targetX);
        return distance < (keyWidth + key.width * 48) / 2 + 10; // 10px 여유
      });

      if (nearbyKeys.length > 0) {
        const highestKey = nearbyKeys.reduce((highest, current) =>
          current.y < highest.y ? current : highest
        );
        targetY = highestKey.y - keyHeight - 2; // 2px 간격
      }

      return { x: targetX, y: targetY };
    },
    []
  );

  const dropKeys = useCallback(
    (velocity: number, dragInfo: PanInfo) => {
      const now = Date.now();
      // 너무 자주 떨어지지 않도록 throttling (200ms)
      if (now - lastShakeTime.current < 200) return;
      lastShakeTime.current = now;

      const keysToRemove = Math.floor(Math.random() * 3) + 1; // 1-3개의 키를 랜덤하게 선택
      const availableKeys: string[] = [];

      // 아직 제거되지 않은 키들 찾기
      FULL_KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
        row.forEach((keyObj, keyIndex) => {
          if (keyObj.key && keyObj.key.trim()) {
            const keyId = `${rowIndex}-${keyIndex}`;
            if (!removedKeys.has(keyId)) {
              availableKeys.push(keyId);
            }
          }
        });
      });

      if (availableKeys.length === 0) return;

      // 랜덤하게 키 선택해서 떨어뜨리기
      const selectedKeys = availableKeys
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(keysToRemove, availableKeys.length));

      const newFallingKeys: FallingKey[] = selectedKeys.map((keyId) => {
        const [rowIndex, keyIndex] = keyId.split("-").map(Number);
        const keyObj = FULL_KEYBOARD_LAYOUT[rowIndex][keyIndex];

        // 키의 실제 위치 계산
        let xOffset = 0;
        for (let i = 0; i < keyIndex; i++) {
          xOffset += FULL_KEYBOARD_LAYOUT[rowIndex][i].width * 48;
        }

        const initialX = xOffset + Math.random() * 20;
        const initialY = rowIndex * 52 + Math.random() * 20;

        return {
          id: keyId,
          letter: keyObj.key,
          x: initialX,
          y: initialY,
          finalX: 0,
          finalY: 0,
          rotation: Math.random() * 360,
          velocityX: (Math.random() - 0.5) * 600 + dragInfo.velocity.x * 0.2,
          velocityY: Math.random() * -300 - 150 + dragInfo.velocity.y * 0.2,
          width: keyObj.width,
          isLanded: false,
        };
      });

      setFallingKeys((prev) => [...prev, ...newFallingKeys]);
      setRemovedKeys((prev) => new Set([...prev, ...selectedKeys]));
    },
    [removedKeys]
  );

  // 떨어지는 키들의 착지 처리
  useEffect(() => {
    const interval = setInterval(() => {
      setFallingKeys((prevFalling) => {
        const stillFalling: FallingKey[] = [];

        prevFalling.forEach((key) => {
          if (!key.isLanded) {
            const floorHeight = getFloorHeight();
            const currentY = key.y + (Date.now() - lastShakeTime.current) * 0.5;

            // 바닥에 도달했는지 체크
            if (currentY >= floorHeight - 48) {
              // 착지 위치 계산
              setStackedKeys((prevStacked) => {
                const landingPos = calculateLandingPosition(key, prevStacked);
                const landedKey: StackedKey = {
                  id: key.id,
                  letter: key.letter,
                  x: landingPos.x,
                  y: landingPos.y,
                  rotation: key.rotation * 0.3, // 착지 시 회전 감소
                  width: key.width,
                };
                return [...prevStacked, landedKey];
              });
            } else {
              stillFalling.push(key);
            }
          }
        });

        return stillFalling;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [calculateLandingPosition]);

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const velocity = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);

    // 드래그 중간에 속도가 빠르면 키를 떨어뜨림
    if (velocity > 800) {
      dropKeys(velocity, info);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const velocity = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);

    // 드래그 끝에도 속도가 빠르면 추가로 키를 떨어뜨림
    if (velocity > 600) {
      dropKeys(velocity, info);
    }

    // 키보드를 원래 위치로 복귀
    x.set(0);
    y.set(0);
  };

  const resetKeyboard = () => {
    setFallingKeys([]);
    setStackedKeys([]);
    setRemovedKeys(new Set());
    x.set(0);
    y.set(0);
    lastShakeTime.current = 0;
  };

  const clearFloor = () => {
    setStackedKeys([]);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8 overflow-hidden relative">
      {/* 바닥에 쌓인 키들 */}
      {stackedKeys.map((key) => (
        <motion.div
          key={`stacked-${key.id}`}
          className="absolute z-10 bg-white rounded-lg shadow-lg flex items-center justify-center font-bold text-gray-800 border-2 border-gray-300 text-xs"
          style={{
            width: `${key.width * 48}px`,
            height: "48px",
            left: `${key.x}px`,
            top: `${key.y}px`,
            rotate: `${key.rotation}deg`,
          }}
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}>
          {key.letter}
        </motion.div>
      ))}

      {/* 떨어지는 키들 */}
      {fallingKeys.map((key) => (
        <motion.div
          key={key.id}
          className="absolute z-20 bg-white rounded-lg shadow-lg flex items-center justify-center font-bold text-gray-800 border-2 border-gray-300 text-xs"
          style={{
            width: `${key.width * 48}px`,
            height: "48px",
          }}
          initial={{
            x: key.x,
            y: key.y,
            rotate: 0,
            scale: 1,
          }}
          animate={{
            x: key.x + key.velocityX * 0.008,
            y: getFloorHeight() - 48, // 바닥까지만 떨어짐
            rotate: key.rotation,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeIn",
            times: [0, 0.1, 1],
          }}>
          {key.letter}
        </motion.div>
      ))}

      <div className="relative z-30">
        {/* 메인 키보드 */}
        <motion.div
          ref={keyboardRef}
          className="bg-gray-800 p-4 rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing select-none"
          style={{ x, y, rotateX, rotateY }}
          drag
          dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
          dragElastic={0.1}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.02 }}>
          <div className="space-y-1">
            {FULL_KEYBOARD_LAYOUT.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                {row.map((keyObj, keyIndex) => {
                  if (!keyObj.key || !keyObj.key.trim()) {
                    // 빈 공간
                    return (
                      <div
                        key={`${rowIndex}-${keyIndex}`}
                        style={{ width: `${keyObj.width * 48}px` }}
                      />
                    );
                  }

                  const keyId = `${rowIndex}-${keyIndex}`;
                  const isRemoved = removedKeys.has(keyId);

                  return (
                    <motion.div
                      key={keyId}
                      className={`h-12 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        isRemoved
                          ? "bg-gray-700 border-2 border-gray-600 shadow-inner"
                          : "bg-white text-gray-800 border-2 border-gray-300 shadow-lg hover:shadow-xl"
                      }`}
                      style={{
                        width: `${keyObj.width * 48}px`,
                      }}
                      animate={
                        isRemoved
                          ? { scale: 0.95, opacity: 0.3 }
                          : { scale: 1, opacity: 1 }
                      }>
                      {!isRemoved && keyObj.key}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 안내 텍스트 */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-white text-lg font-medium">
            키보드를 드래그해서 세게 흔들어보세요! 🎹
          </p>
          <p className="text-gray-300 text-sm">키들이 바닥에 쌓입니다!</p>
          <div className="flex gap-4 justify-center">
            <motion.button
              onClick={resetKeyboard}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              키보드 리셋
            </motion.button>
            <motion.button
              onClick={clearFloor}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              바닥 청소
            </motion.button>
          </div>
          <p className="text-gray-400 text-xs">
            쌓인 키: {stackedKeys.length}개
          </p>
        </div>
      </div>

      {/* 바닥 표시선 */}
      <div
        className="absolute bottom-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30"
        style={{ top: `${getFloorHeight()}px` }}
      />
    </div>
  );
}
