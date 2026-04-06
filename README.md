```markdown
# Angkor Watch Face ⏱️🇰🇭

A stunning, culturally inspired analog watch face component built with **React + TypeScript + Tailwind CSS**, featuring traditional Khmer temple aesthetics and Khmer numerals.

Inspired by the grandeur of Angkor Wat, this watch face blends modern watch design with rich Cambodian heritage.

## ✨ Features

- **Authentic Khmer Numerals** (១–១២) for hour markers
- **Smooth analog hands** with realistic rotation calculations
- **Temple-inspired design** with warm golden, amber, and red color palette
- **Animated glowing effects** and subtle temple spire decorations
- **Date & Month display** (supports Khmer month names)
- **Digital time** with elegant Khmer script label
- **Fully responsive** (scales beautifully on different screen sizes)
- **Realistic watch elements**: crown, pushers, glass reflection, and ornamental details
- **Brand plate** with "ANGKOR អង្គរ" logo

## 🎨 Design Highlights

- Radial gradients and layered shadows for depth
- Custom SVG temple patterns and spire rays
- Glowing "templeGlow" animation
- Khmer cultural color scheme (Saffron, Gold, Deep Red)
- Ornamental rings and decorative elements

## 📁 Component Props

```tsx
interface WatchFaceProps {
  time: {
    hours: number;      // 0-23
    minutes: number;    // 0-59
    seconds: number;    // 0-59
    date: number;       // 1-31
    month: string;      // e.g. "APRIL", "មេសា", etc.
  };
}
```

## 🚀 Usage Example

```tsx
import WatchFace from './components/WatchFace';

function App() {
  const [currentTime, setCurrentTime] = useState({
    hours: 14,
    minutes: 35,
    seconds: 22,
    date: 6,
    month: "មេសា",        // April in Khmer
  });

  // Update time every second (example)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        date: now.getDate(),
        month: "មេសា", // You can make this dynamic too
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <WatchFace time={currentTime} />;
}
```

## 🛠️ Technologies Used

- React 18 + TypeScript
- Tailwind CSS
- SVG for precise decorative elements
- CSS Animations & Gradients

## 📸 Preview

*(Add screenshots or GIF here once you have them)*

![Angkor Watch Face](preview.png)

## 🎯 Customization Ideas

- Change color palette (e.g., silver & blue for modern look)
- Add different cultural themes (Wat Phnom, Bayon, etc.)
- Include Khmer lunar calendar support
- Add complication widgets (weather, steps, heart rate)
- Make it a real smartwatch face (Wear OS / WatchOS)

## 📜 License

MIT License – feel free to use this in your personal or commercial projects.

---

**Made with ❤️ for Cambodian culture and beautiful design.**

If you like this project, feel free to give it a star ⭐!
```