## Điều chỉnh Hoa Đất Việt section
- Ở title: Hoa
Đất
Việt
Tinh hoa nghệ thuật cội nguồn. Thay phần đó bằng ảnh title: C:\Users\ADMIN\Desktop\signal_seeker\public\images\hoadatviet\hoadatviet_title.png
- Thay các card image: C:\Users\ADMIN\Desktop\signal_seeker\public\images\hoadatviet\hdv1.jpg
C:\Users\ADMIN\Desktop\signal_seeker\public\images\hoadatviet\hdv2.jpg
C:\Users\ADMIN\Desktop\signal_seeker\public\images\hoadatviet\hdv3.jpg
C:\Users\ADMIN\Desktop\signal_seeker\public\images\hoadatviet\hdv4.jpg
Bằng 1 box (ko màu, ko viền, ko shaodw)chứa 4 ảnh với hiệu ứng như sau:
Install dependencies
npm i motion clsx tailwind-merge
Copy
Add util file
lib/utils.ts
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

Copy
Select Language
Copy the source code
components/ui/draggable-card.tsx

"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "motion/react";
 
export const DraggableCardBody = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
 
  // physics biatch
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
 
  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };
 
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig,
  );
 
  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig,
  );
 
  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig,
  );
 
  useEffect(() => {
    // Update constraints when component mounts or window resizes
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        });
      }
    };
 
    updateConstraints();
 
    // Add resize listener
    window.addEventListener("resize", updateConstraints);
 
    // Clean up
    return () => {
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);
 
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };
 
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
 
  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = "default";
 
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        });
        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();
 
        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX +
            currentVelocityY * currentVelocityY,
        );
        const bounce = Math.min(0.8, velocityMagnitude / 1000);
 
        animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });
 
        animate(info.point.y, info.point.y + currentVelocityY * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });
      }}
      style={{
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative min-h-96 w-80 overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl transform-3d dark:bg-neutral-900",
        className,
      )}
    >
      {children}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
};
 
export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("[perspective:3000px]", className)}>{children}</div>
  );
};

- Background của section Hoa Đất Viết cho trắng giống background nền
- Cái hoa sen giữ full height của nó, ko bị cắt như bây  giờ


## Điều chỉnh UI DỰ ÁN dự án THỦY ĐÌNH KỲ THÚ
- 2 con puppet xích qua xa sát mép web
- cho element cá to ra, nằm đằng sau sóng và nhích xuống cho nó nằm trùng với element wave

## Thu quỹ navigation
- Thêm tôi ở ngày góc trái cùng của topheadbar có 1 điều hướng donate đẹp mắt, chuyên nghiệp
- Mọi donate, thu quỹ button đều phải chỉa ra một trang riêng để quét QR gây quỹ và có nút quay lại, background lấy: C:\Users\ADMIN\Desktop\signal_seeker\public\images\hero\donate_bg.jpg và tham khảo kĩ bố cục, nội dung UI trang đó ở: C:\Users\ADMIN\Desktop\signal_seeker\public\images\UI\donate_ui.jpg