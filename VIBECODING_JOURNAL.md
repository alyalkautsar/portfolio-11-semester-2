# VIBECODING Journal

## 1. Definisi Stack & Arsitektur

### Stack yang Digunakan:
- **ReactJS 18** - Library UI yang powerful dengan component-based architecture
- **Vite 5** - Build tool modern yang cepat dengan Hot Module Replacement (HMR)
- **React Router DOM v6** - Routing library untuk SPA dengan declarative routing
- **CSS Modules** - Scoped styling yang mencegah collision nama class

### Mengapa Struktur Folder Seperti Ini?

```
src/
├── components/     # Komponen reusable yang bisa dipakai di multiple pages
│   ├── Navbar/      # Navigasi utama dengan theme toggle
│   └── Footer/      # Footer dengan social links
├── pages/           # Page-level components yang sesuai dengan routes
│   ├── Home/        # Landing page dengan hero section
│   ├── About/        # Profil dan skills
│   ├── Project/      # Gallery project
│   └── Contact/      # Form contact + guestbook
├── context/         # React Context untuk state management global
│   └── ThemeContext.jsx  # Dark/light mode dengan localStorage persistence
├── data/            # Data hardcoded yang terpisah dari komponen
│   ├── profile.js   # Data profil (nama, skills, pendidikan)
│   └── projects.js  # Array project dengan metadata
├── App.jsx          # Root component dengan routing setup
├── App.module.css   # Global app styles
├── main.jsx         # Entry point
└── index.css        # CSS variables & global resets
```

**Alasan desain struktur:**

1. **Pemisahan concerns** - Data (`data/`), state management (`context/`), UI (`components/`), dan pages (`pages/`) dipisah agar kode lebih terorganisir.

2. **Scalability** - Struktur ini memungkinkan kita menambah fitur baru tanpa mengacaukan struktur existing. Components yang sama bisa dipakai ulang di halaman berbeda.

3. **CSS Modules** - Setiap komponen punya CSS sendiri yang scoped, mencegah conflict dan membuat kode lebih maintainable.

4. **集中式 Data** - Semua data hardcoded di satu tempat (`src/data/`), memudahkan perubahan tanpa harus edit banyak file.

---

## 2. Strategi Prompting

### Contoh Prompt 1: Routing Setup

```
Prompt: "Create React Router v6 setup for a portfolio SPA with routes:
- / → Home component
- /about → About component
- /project → Project component
- /contact → Contact component

Requirements:
- Use BrowserRouter as wrapper
- Use Routes and Route from react-router-dom
- Create App.jsx as the main router component
- Navbar should be outside Routes (always visible)
- Footer should also be outside Routes
- Use CSS Modules for styling"
```

**Hasil yang dicapai:**
- SPA dengan 4 halaman lengkap
- Navigasi yang persist saat berganti halaman (tanpa refresh)
- URL yang clean dan bookmarkable

### Contoh Prompt 2: localStorage Implementation

```
Prompt: "Implement localStorage persistence for a contact form in React:

Requirements:
- Form has 3 fields: name, email, message
- All fields controlled by useState
- On every onChange, save form data to localStorage with key 'portfolio_contact_form'
- On component mount (useEffect), load saved form data if exists
- On successful submit, clear form and localStorage
- Create a guestbook section that displays submitted messages
- Guestbook data stored separately with key 'portfolio_guestbook' as JSON array
- Each entry should have id (timestamp), name, email, message, and date

Implementation approach:
- useEffect with empty deps array for initial load from localStorage
- Separate handleChange function that updates state AND saves to localStorage
- handleSubmit that adds to guestbook array and clears form
- formatDate helper to display dates in Indonesian format"
```

**Hasil yang dicapai:**
- Form data tidak hilang saat refresh
- Guestbook yang persist di localStorage
- Validasi form sebelum submit
- UX yang seamless untuk user

---

## 3. Log Problem Solving

### Bug Scenario: Dark Mode Tidak Persist Saat Refresh

#### Deskripsi Bug:
Saat user mengubah tema (dark/light) di navbar, tema berubah dengan benar. Namun ketika page di-refresh, tema kembali ke default (bukan tema yang dipilih user sebelumnya).

#### Symptoms:
1. User klik toggle button untuk switch ke dark mode
2. Tema berubah menjadi dark mode dengan benar
3. User refresh halaman
4. Tema kembali ke light mode (atau default sistem)
5. User harus selalu klik toggle setiap kali membuka page

#### Root Cause:
Tema hanya disimpan di React state (`useState`), tidak di-persist ke localStorage. Setiap kali komponen di-remount (refresh), state di-reset ke initial value.

#### Langkah Debug:

1. **Identifikasi lokasi kode**
   - `ThemeContext.jsx` - tempat state theme dan toggle function
   - `useTheme()` hook - tempat consumption dari context

2. **Cek alur data**
   ```
   ThemeProvider
   ├── useState( initialValue ) --> state theme
   ├── toggleTheme() --> setTheme(prev => ...) --> UI updates
   └── <ThemeContext.Provider value={{ theme, toggleTheme }}>
   ```

3. **Temukan missing piece**
   - State tidak di-sync dengan localStorage
   - Tidak ada useEffect untuk load tema dari localStorage saat mount
   - Tidak ada useEffect untuk save tema ke localStorage saat berubah

#### Solution:

```javascript
// BEFORE (Buggy)
const [theme, setTheme] = useState('light');

const toggleTheme = () => {
  setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
};

// AFTER (Fixed)
const [theme, setTheme] = useState(() => {
  // Load from localStorage on initial render
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  // Fallback to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
});

useEffect(() => {
  // Save to localStorage whenever theme changes
  localStorage.setItem('theme', theme);
  // Also update document attribute for CSS selectors
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

const toggleTheme = () => {
  setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
};
```

#### Prevention:
- Selalu gunakan localStorage untuk state yang harus persist
- Gunakan `useEffect` dengan dependency array yang tepat
- Implementasi pattern "load on mount, save on change"
- Testing: refresh page berkali-kali untuk verify persistence
