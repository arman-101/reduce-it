# Reduce It 🖼️

A modern, fast, and user-friendly image compression tool built with Next.js. Compress your images to specific file sizes while maintaining quality and optimizing for web performance.

![1](https://github.com/user-attachments/assets/f2c031ec-5a61-46d5-a7a9-b01249f48ef2)
![2](https://github.com/user-attachments/assets/96cd79b4-1ca7-46ef-859e-efae8bb9c33e)
![3](https://github.com/user-attachments/assets/faa9065e-c335-4d8c-8c2c-5b74f11789ba)

## ✨ Features

### 🎯 **Smart Image Compression**
- **Target Size Control**: Set exact file size targets (10KB - 2MB)
- **Quality Priority Option**: Choose between file size or image quality
- **Batch Processing**: Upload and compress up to 10 images simultaneously
- **Real-time Progress**: Visual progress bar with percentage completion
- **Format Support**: JPG, PNG, JPEG formats

### 🎨 **Modern User Experience**
- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Automatic theme switching with manual toggle
- **Real-time Preview**: See your images before and after compression
- **Interactive Slider**: Easy target size adjustment

### 📊 **Advanced Features**
- **Before/After Comparison**: View original vs compressed file sizes
- **Individual Downloads**: Download compressed images one by one
- **Bulk Download**: Download all compressed images as a ZIP file
- **File Size Display**: Shows original dimensions and file sizes
- **Error Handling**: Graceful error messages and validation

### 🔧 **Technical Excellence**
- **Client-side Processing**: No server uploads, your images stay private
- **Web Workers**: Background processing for smooth UI experience
- **Memory Management**: Automatic cleanup of temporary files
- **Browser Optimization**: Uses Next.js Image component for performance
- **TypeScript**: Full type safety and better development experience

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development

### **UI & Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark/light theme management

### **Image Processing**
- **browser-image-compression** - Client-side image compression
- **JSZip** - ZIP file creation for bulk downloads
- **file-saver** - File download functionality

### **File Handling**
- **react-dropzone** - Drag & drop file uploads
- **Context API** - State management for processed images

### **Development Tools**
- **ESLint** - Code linting and quality
- **Turbopack** - Fast development bundler
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reduce-it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

1. **Upload Images**: Drag & drop or click to browse files
2. **Set Target Size**: Use the slider to choose your desired file size
3. **Choose Quality**: Toggle "Prioritize Quality" if you want to maintain resolution
4. **Compress**: Click "Reduce Images" to start processing
5. **Download**: Get your compressed images individually or as a ZIP

## 🎨 Design System

### **Color Scheme**
- **Primary**: Customizable primary colors
- **Secondary**: Muted secondary colors  
- **Accent**: Highlight colors for interactions
- **Background**: Light/dark theme backgrounds

### **Typography**
- **Serif Fonts**: Elegant headings and titles
- **Sans-serif**: Clean, readable body text
- **Responsive**: Scales appropriately across devices

### **Components**
- **Cards**: Clean, elevated content containers
- **Buttons**: Interactive elements with hover states
- **Modals**: Overlay dialogs for confirmations
- **Progress Bars**: Visual feedback for operations

## 🔒 Privacy & Security

- **Client-side Only**: All processing happens in your browser
- **No Uploads**: Images never leave your device
- **No Tracking**: No analytics or data collection
- **Open Source**: Transparent, auditable code

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ☕ Support

If you find this tool helpful, consider [buying me a coffee](https://buymeacoffee.com/darknebulax1)!

---

Built with ❤️ by Arman
