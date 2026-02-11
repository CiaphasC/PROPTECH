# 🏢 PROPTECH - Plataforma Inmobiliaria Moderna

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.172-000000?logo=three.js)

Una aplicación web moderna y elegante para la visualización y gestión de propiedades inmobiliarias, construida con las últimas tecnologías de desarrollo frontend.

## 📋 Descripción

PROPTECH es una plataforma inmobiliaria completa que ofrece una experiencia de usuario premium para buscar, explorar y gestionar propiedades. La aplicación cuenta con efectos visuales atractivos, navegación fluida y una arquitectura escalable basada en Feature-Sliced Design.

## ✨ Características Principales

- 🏠 **Catálogo de Propiedades**: Visualiza casas, departamentos y locales comerciales con información detallada
- 🔍 **Búsqueda Avanzada**: Filtra por tipo de propiedad, estado (venta/alquiler) y búsqueda por texto
- 📊 **Dashboard Administrativo**: Gestión y creación de nuevas propiedades
- 🎨 **Diseño Moderno**: Interfaz elegante con animaciones suaves y efectos de parallax
- 🌊 **Efectos 3D**: Fondo animado con Three.js para una experiencia visual única
- 📱 **Responsive Design**: Adaptado para dispositivos móviles, tablets y escritorio
- ⚡ **Alto Rendimiento**: Optimizado con Vite y code-splitting inteligente
- 🎯 **TypeScript**: Código completamente tipado para mayor seguridad

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **React 18.3** - Biblioteca UI con hooks modernos
- **TypeScript 5.8** - Tipado estático para JavaScript
- **Vite 6.0** - Build tool ultrarrápido

### Estilos y UI
- **TailwindCSS 3.4** - Framework CSS utility-first
- **Lucide React** - Iconos SVG modernos
- **PostCSS** - Procesamiento de CSS

### Efectos 3D
- **Three.js 0.172** - Renderizado 3D para efectos de fondo

### Arquitectura
- **Feature-Sliced Design** - Organización modular del código
- **React Context** - Gestión de estado global
- **Custom Hooks** - Lógica reutilizable

## 📁 Estructura del Proyecto

```
inmobiliaria/
├── src/
│   ├── app/                    # Capa de aplicación
│   │   ├── providers/          # Context providers
│   │   └── state/              # Gestión de estado global
│   ├── entities/               # Entidades del dominio
│   │   └── property/           # Entidad de propiedad
│   │       ├── model/          # Tipos y lógica de negocio
│   │       └── ui/             # Componentes de propiedad
│   ├── features/               # Características de la app
│   │   ├── background/         # Efectos visuales 3D
│   │   ├── dashboard/          # Panel administrativo
│   │   ├── detail/             # Vista detalle de propiedad
│   │   ├── home/               # Página de inicio
│   │   ├── layout/             # Header y Footer
│   │   └── search/             # Búsqueda y filtros
│   ├── shared/                 # Código compartido
│   │   ├── components/         # Componentes reutilizables
│   │   ├── hooks/              # Hooks personalizados
│   │   ├── lib/                # Utilidades
│   │   └── styles/             # Estilos globales
│   └── data/                   # Datos y repositorios
│       ├── properties.mock.ts  # Datos de ejemplo
│       └── repositories/       # Capa de acceso a datos
├── public/                     # Archivos estáticos
├── index.html                  # Punto de entrada
└── vite.config.ts              # Configuración de Vite
```

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js 18+ 
- npm o pnpm

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/CiaphasC/PROPTECH.git
cd PROPTECH
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
npm run dev        # Inicia el servidor de desarrollo
npm run build      # Construye la aplicación para producción
npm run preview    # Previsualiza la build de producción
npm run typecheck  # Verifica tipos de TypeScript
```

## 🎯 Funcionalidades Detalladas

### 🏠 Vista Principal (Home)
- Hero section con efecto 3D de fondo
- Métricas destacadas del negocio
- Propiedades destacadas
- Call-to-action para explorar el catálogo

### 🔍 Vista de Búsqueda
- Barra de búsqueda en tiempo real
- Filtros por tipo de propiedad (Casa, Departamento, Comercial)
- Filtros por estado (Venta, Alquiler)
- Grid responsivo de tarjetas de propiedades
- Animaciones de entrada suaves

### 📄 Vista de Detalle
- Galería de imágenes de la propiedad
- Información completa (precio, ubicación, características)
- Lista de amenidades y características
- Formulario de contacto con el agente
- Información del agente inmobiliario

### 📊 Dashboard Administrativo
- Formulario de creación de propiedades
- Validación de campos
- Vista previa en tiempo real
- Gestión del catálogo

## 🎨 Características Técnicas

### Arquitectura FSD (Feature-Sliced Design)

El proyecto sigue la metodología Feature-Sliced Design con las siguientes capas:

- **app/** - Lógica de inicialización de la aplicación
- **entities/** - Entidades del dominio del negocio
- **features/** - Funcionalidades de la aplicación
- **shared/** - Código compartido entre capas

### Gestión de Estado

- Context API para estado global
- Reducer pattern para actualizaciones predecibles
- Selectores derivados para datos computados
- Custom hooks para lógica de negocio

### Optimizaciones

- **Code Splitting**: División automática del código por rutas
- **Manual Chunks**: Separación de dependencias grandes (React, Three.js)
- **Lazy Loading**: Carga diferida de componentes
- **Tree Shaking**: Eliminación de código no utilizado

## 🔧 Configuración

### Alias de TypeScript

El proyecto utiliza alias `@/` para imports absolutos:

```typescript
import { Property } from "@/entities/property/model/types";
import { cn } from "@/shared/lib/cn";
```

### TailwindCSS

Configurado con utilidades personalizadas y tema extendido. Ver [tailwind.config.js](tailwind.config.js)

## 📦 Build de Producción

Para generar una build optimizada:

```bash
npm run build
```

El output estará en el directorio `dist/` listo para ser desplegado en cualquier servidor estático.

### Despliegue

La aplicación puede ser desplegada en:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Cualquier hosting de archivos estáticos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Próximas Mejoras

- [ ] Integración con backend real (API REST/GraphQL)
- [ ] Autenticación de usuarios
- [ ] Sistema de favoritos
- [ ] Comparador de propiedades
- [ ] Mapa interactivo con ubicaciones
- [ ] Chat en tiempo real con agentes
- [ ] Sistema de notificaciones
- [ ] Tours virtuales 360°
- [ ] Calculadora de hipoteca
- [ ] Integración con redes sociales

## 📄 Licencia

Este proyecto es privado y está bajo licencia propietaria.

## 👥 Autor

Desarrollado con ❤️ para PROPTECH

---

⭐ Si te gusta el proyecto, no olvides darle una estrella en GitHub!
