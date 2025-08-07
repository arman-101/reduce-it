Project Brief: ReduceIt!
1. Project Overview
Project Name: ReduceIt!
Objective: A user-friendly, aesthetically pleasing web application that allows users to compress multiple images (JPG, PNG, etc.) to a target file size in kilobytes (KB).

2. Core Functionality
Phase 1: Image Upload & Selection
File Input: Users can either click a button to open a file selector or drag and drop multiple images onto a designated drop zone.

Staging Area: Once selected, images appear in a staging area before compression.

Image Card: Each staged image should be displayed in a "card" format, showing:

A small thumbnail preview of the image.

Image Name (e.g., vacation-photo.jpg)

File Type (e.g., PNG)

Dimensions (e.g., 1920x1080)

Original Size (e.g., 2.4 MB)

A "Cancel" (X) button to remove the image from the queue.

Phase 2: Compression Settings
Size Slider: A smooth, interactive slider allows the user to select the target file size.

Default Value: The slider should default to 100 KB.

Display: The selected value (e.g., 100 KB) should be clearly visible next to the slider.

"Reduce" Button: A primary call-to-action button, clearly labeled "Reduce Images".

Phase 3: Processing & Results
Progress Indicator: After clicking "Reduce," the UI should show a loading state and indicate progress (e.g., "Compressing 4 of 10 images...").

Results Display: Once complete, the staged images are replaced by the compressed versions. Each result card should show:

Image preview.

Image Name.

Original Size vs. New Size (e.g., 2.4 MB -> 98 KB).

A "Download" button for each individual image. The downloaded file must retain its original name.

Batch Download: A prominent "Download All as .zip" button that packages all compressed images into a single zip file named Reduced-Images.zip.

Reset: A "Reduce More Images?" button that clears the results and returns the user to the initial upload screen.

3. Design & UI/UX
Aesthetic: The design should be clean, modern, and reflect the provided custom theme. It should feel professional and trustworthy.

Layout:

A simple header containing the app name "ReduceIt!" and a light/dark mode toggle button.

A main content area, centered on the page, that houses the uploader, settings, and results.

Generous spacing and clear visual hierarchy.

Fonts:

Sans-serif: Merriweather

Serif: Source Serif 4

Monospace: JetBrains Mono

Color Palette: The application must use the provided CSS variables for light and dark modes to ensure a consistent and polished look. The theme is non-negotiable.

Responsiveness: The layout must be fully responsive and work seamlessly on desktop, tablet, and mobile devices.

4. Technical Stack
Framework: Next.js (with App Router)

Language: TypeScript

Styling: Tailwind CSS

Future Considerations: Supabase may be integrated later for user accounts or saved history, but is not part of the initial build. All image processing will be done client-side for now.