import React, { useState, useEffect, useMemo } from 'react';

// --- 图标组件 (内联 SVG 以保证无依赖运行) ---
const IconMenu = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconFolder = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
const IconTag = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const IconExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const IconLayout = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;

// 新增分类图标
const IconEdit = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
const IconBook = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const IconMonitor = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const IconStar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const IconWarning = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const IconDownload = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const IconSmile = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>;

const CATEGORY_ICONS = {
  folder: IconFolder,
  book: IconBook,
  monitor: IconMonitor,
  heart: IconHeart,
  star: IconStar,
  code: IconCode,
  briefcase: IconBriefcase
};

// --- 初始默认数据 ---
const DEFAULT_CATEGORIES = [
  { id: 'all', name: '全部收藏', icon: 'folder' },
  { id: 'dev', name: '开发工具', icon: 'code' },
  { id: 'design', name: '设计资源', icon: 'heart' },
  { id: 'read', name: '阅读资讯', icon: 'book' },
];

const DEFAULT_BOOKMARKS = [
  { id: 1, title: 'GitHub', url: 'https://github.com', description: '全球最大的代码托管平台，开发者的开源社区。', categoryId: 'dev', tags: ['代码', '开源'] },
  { id: 2, title: 'Tailwind CSS', url: 'https://tailwindcss.com', description: '无需离开 HTML 即可快速构建现代网站的实用优先 CSS 框架。', categoryId: 'dev', tags: ['CSS', '前端'] },
  { id: 3, title: 'Dribbble', url: 'https://dribbble.com', description: '全球顶尖设计师的作品交流与灵感获取平台。', categoryId: 'design', tags: ['设计', '灵感'] },
  { id: 4, title: 'V2EX', url: 'https://v2ex.com', description: '一个关于分享和探索的地方，创意工作者们的社区。', categoryId: 'read', tags: ['社区', '讨论'] },
  { id: 5, title: 'React', url: 'https://react.dev', description: '用于构建 Web 和原生交互界面的库。', categoryId: 'dev', tags: ['前端', 'JavaScript'] },
  { id: 6, title: 'UI Design Dictionary', url: 'https://ui-design-dictionary.pages.dev/', description: 'UI 设计词典，提供 UI 设计相关的术语解释与参考。', categoryId: 'design', tags: ['设计', '术语', '词典'] },
];

export default function App() {
  // --- 状态管理 ---
  // 使用惰性初始化 (Lazy Initial State) 从 LocalStorage 同步加载数据
  const [categories, setCategories] = useState(() => {
    try {
      const savedData = localStorage.getItem('bookmark_manager_data');
      if (savedData) return JSON.parse(savedData).categories || DEFAULT_CATEGORIES;
    } catch (e) {
      console.error('Failed to parse categories data', e);
    }
    return DEFAULT_CATEGORIES;
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const savedData = localStorage.getItem('bookmark_manager_data');
      if (savedData) return JSON.parse(savedData).bookmarks || DEFAULT_BOOKMARKS;
    } catch (e) {
      console.error('Failed to parse bookmarks data', e);
    }
    return DEFAULT_BOOKMARKS;
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI 状态
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  // 响应式及拖拽相关状态
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarWidth, setSidebarWidth] = useState(220); 
  const [isDragging, setIsDragging] = useState(false);

  // 计算实际展示宽度
  const actualWidth = sidebarWidth < 140 ? 80 : sidebarWidth;
  const isIconOnly = !isMobile && actualWidth <= 80;

  // 表单状态
  const [formData, setFormData] = useState({ title: '', url: '', description: '', categoryId: 'dev', tags: '' });
  const [categoryForm, setCategoryForm] = useState({ id: null, name: '', icon: 'folder', customEmoji: '' });

  // 卡片标签内联编辑状态
  const [addingTagId, setAddingTagId] = useState(null);
  const [newTagInput, setNewTagInput] = useState('');

  // 删除确认弹窗状态
  const [deleteBookmarkId, setDeleteBookmarkId] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [tagToDelete, setTagToDelete] = useState(null); 

  // --- 事件监听初始化 ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- 数据持久化 ---
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('bookmark_manager_data', JSON.stringify({ categories, bookmarks }));
    }
  }, [categories, bookmarks]);

  // --- 侧边栏拖拽处理 ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      let newWidth = e.clientX;
      if (newWidth > 480) newWidth = 480; 
      if (newWidth < 60) newWidth = 60;   
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize'; 
      document.body.style.userSelect = 'none';   
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // --- 数据过滤 (基于分类和搜索) ---
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(bookmark => {
      const matchCategory = activeCategory === 'all' || bookmark.categoryId === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = 
        bookmark.title.toLowerCase().includes(searchLower) ||
        bookmark.description.toLowerCase().includes(searchLower) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      return matchCategory && matchSearch;
    });
  }, [bookmarks, activeCategory, searchQuery]);

  // --- 处理函数 ---
  const handleSaveBookmark = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;

    let finalUrl = formData.url;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const newBookmark = {
      id: Date.now(),
      title: formData.title,
      url: finalUrl,
      description: formData.description,
      categoryId: formData.categoryId || categories.find(c => c.id !== 'all')?.id || 'all',
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
    };

    setBookmarks([newBookmark, ...bookmarks]);
    setIsAddModalOpen(false);
    setFormData({ title: '', url: '', description: '', categoryId: activeCategory === 'all' ? 'dev' : activeCategory, tags: '' });
  };

  const handleDeleteBookmark = (id) => {
    setDeleteBookmarkId(id);
  };

  const confirmDeleteBookmark = () => {
    if (deleteBookmarkId !== null) {
      setBookmarks(bookmarks.filter(b => b.id !== deleteBookmarkId));
      setDeleteBookmarkId(null);
    }
  };

  const handleDeleteTagClick = (bookmarkId, tag) => {
    setTagToDelete({ bookmarkId, tag });
  };

  const confirmDeleteTag = () => {
    if (tagToDelete) {
      setBookmarks(bookmarks.map(b => {
        if (b.id === tagToDelete.bookmarkId) {
          return { ...b, tags: b.tags.filter(t => t !== tagToDelete.tag) };
        }
        return b;
      }));
      setTagToDelete(null);
    }
  };

  const handleAddTagSubmit = (bookmarkId, e) => {
    if (e) e.preventDefault();
    const tag = newTagInput.trim();
    if (tag) {
      setBookmarks(bookmarks.map(b => {
        if (b.id === bookmarkId) {
          const newTags = b.tags.includes(tag) ? b.tags : [...b.tags, tag];
          return { ...b, tags: newTags };
        }
        return b;
      }));
    }
    setAddingTagId(null);
    setNewTagInput('');
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;
    
    // 如果选择了自定义 Emoji，则存储 Emoji 字符串，否则存储图标 Key
    const finalIcon = categoryForm.icon === 'custom' ? (categoryForm.customEmoji || '📁') : categoryForm.icon;

    if (categoryForm.id) {
      setCategories(categories.map(c => 
        c.id === categoryForm.id ? { ...c, name: categoryForm.name.trim(), icon: finalIcon } : c
      ));
    } else {
      const newCategory = {
        id: 'cat_' + Date.now(),
        name: categoryForm.name.trim(),
        icon: finalIcon
      };
      setCategories([...categories, newCategory]);
    }
    
    setIsCategoryModalOpen(false);
  };

  const openAddCategoryModal = () => {
    setCategoryForm({ id: null, name: '', icon: 'folder', customEmoji: '' });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat, e) => {
    e.stopPropagation();
    const isPreset = !!CATEGORY_ICONS[cat.icon];
    setCategoryForm({ 
      id: cat.id, 
      name: cat.name, 
      icon: isPreset ? cat.icon : 'custom',
      customEmoji: isPreset ? '' : cat.icon
    });
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (id, e) => {
    e.stopPropagation(); 
    if (id === 'all') return;
    setDeleteCategoryId(id);
  };

  const confirmDeleteCategory = () => {
    if (deleteCategoryId !== null) {
      setCategories(categories.filter(c => c.id !== deleteCategoryId));
      setBookmarks(bookmarks.filter(b => b.categoryId !== deleteCategoryId));
      if (activeCategory === deleteCategoryId) setActiveCategory('all');
      setDeleteCategoryId(null);
    }
  };

  const handleExportData = () => {
    const exportStructure = categories
      .filter(cat => cat.id !== 'all') 
      .map(cat => ({
        categoryName: cat.name,
        categoryId: cat.id,
        icon: cat.icon,
        items: bookmarks.filter(b => b.categoryId === cat.id).map(b => ({
          title: b.title,
          url: b.url,
          description: b.description,
          tags: b.tags
        }))
      }));
    
    const categorizedIds = categories.map(c => c.id);
    const unCategorized = bookmarks.filter(b => !categorizedIds.includes(b.categoryId));
    if (unCategorized.length > 0) {
      exportStructure.push({
        categoryName: "未分类",
        categoryId: "unCategorized",
        icon: "folder",
        items: unCategorized.map(b => ({
          title: b.title,
          url: b.url,
          description: b.description,
          tags: b.tags
        }))
      });
    }

    const jsonString = JSON.stringify(exportStructure, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    
    const date = new Date();
    const timestamp = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}_${date.getHours().toString().padStart(2,'0')}${date.getMinutes().toString().padStart(2,'0')}`;
    a.download = `bookmarks_grouped_${timestamp}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- 组件渲染助手 ---
  const renderCategoryIcon = (iconKey) => {
    const IconComponent = CATEGORY_ICONS[iconKey];
    if (IconComponent) return <IconComponent />;
    // 如果不在预设库里，视为 Emoji 文本
    return <span className="text-lg w-[18px] h-[18px] flex items-center justify-center leading-none">{iconKey}</span>;
  };

  // 国内网络友好的 Favicon 获取函数 (使用 Iowen API)
  const getFaviconUrl = (urlString) => {
    try {
      const url = new URL(urlString);
      // 使用国内访问稳定的 iowen 图标服务
      return `https://api.iowen.cn/favicon/${url.hostname}.png`;
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-800 font-sans overflow-hidden">
      
      {/* --- 左侧边栏 --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <aside 
        style={{ '--sidebar-width': `${actualWidth}px` }}
        className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col overflow-visible
          ${isDragging ? '' : 'transition-all duration-300 ease-in-out'}
          ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          md:relative md:translate-x-0
          ${isDesktopSidebarOpen ? 'md:w-[var(--sidebar-width)]' : 'md:w-0 md:border-none'}
        `}
      >
        <div className="h-full flex flex-col w-full bg-white overflow-hidden relative z-10">
          <div className={`p-5 border-b border-gray-100 flex items-center ${isIconOnly ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl overflow-hidden">
              <IconLayout />
              {!isIconOnly && <span className="truncate">网页收藏</span>}
            </div>
            {!isIconOnly && (
              <button className="md:hidden text-gray-500 hover:text-gray-800 flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                <IconX />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {!isIconOnly && <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3 mt-2 whitespace-nowrap">分类</div>}
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setIsMobileMenuOpen(false); }}
                title={isIconOnly ? cat.name : undefined}
                className={`
                  flex items-center ${isIconOnly ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'} rounded-lg cursor-pointer transition-colors group
                  ${activeCategory === cat.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <div className={`flex items-center ${isIconOnly ? 'justify-center' : 'gap-3'} overflow-hidden`}>
                  {renderCategoryIcon(cat.icon)}
                  {!isIconOnly && <span className="truncate">{cat.name}</span>}
                </div>
                
                {!isIconOnly && cat.id !== 'all' && (
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2 gap-1">
                    <button 
                      onClick={(e) => openEditCategoryModal(cat, e)}
                      className="p-1 text-gray-400 hover:text-indigo-500 transition-colors"
                      title="编辑分类"
                    >
                      <IconEdit />
                    </button>
                    <button 
                      onClick={(e) => handleDeleteCategory(cat.id, e)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="删除分类"
                    >
                      <IconX />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={openAddCategoryModal}
              title={isIconOnly ? "新建分类" : undefined}
              className={`w-full flex items-center justify-center gap-2 py-2 ${isIconOnly ? 'px-0' : 'px-4'} border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors overflow-hidden`}
            >
              <IconPlus />
              {!isIconOnly && <span className="truncate">新建分类</span>}
            </button>
          </div>
        </div>

        {isDesktopSidebarOpen && (
          <div
            onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
            className={`hidden md:block absolute top-0 -right-1 w-2 h-full cursor-col-resize z-50 hover:bg-indigo-500/50 transition-colors ${isDragging ? 'bg-indigo-500' : 'bg-transparent'}`}
          />
        )}
      </aside>

      {/* --- 右侧主内容区 --- */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        
        <header className="bg-white border-b border-gray-200 h-16 px-4 sm:px-6 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1">
            <button 
              className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <IconMenu />
            </button>
            
            <button 
              className="hidden md:block p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            >
              <IconMenu />
            </button>
            
            <div className="relative w-full max-md:hidden max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <IconSearch />
              </div>
              <input
                type="text"
                placeholder="搜索标题、描述或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors"
            >
              <IconPlus />
              <span className="hidden sm:inline">添加书签</span>
            </button>
            <button 
              onClick={handleExportData}
              title="导出所有书签和分类"
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-colors"
            >
              <IconDownload />
              <span className="hidden md:inline">导出数据</span>
            </button>
          </div>
        </header>

        {/* 移动端搜索栏 */}
        <div className="md:hidden p-4 bg-white border-b border-gray-100">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <IconSearch />
            </div>
            <input
              type="text"
              placeholder="搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50/50">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              {categories.find(c => c.id === activeCategory)?.name || '未知分类'}
            </h2>
            <span className="text-sm text-gray-500">共 {filteredBookmarks.length} 项</span>
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <IconFolder />
              <p className="mt-4 text-lg">这里空空如也</p>
              <p className="text-sm mt-1">点击右上角添加您的第一个书签吧</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredBookmarks.map((bookmark) => (
                <div 
                  key={bookmark.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full hover:shadow-md transition-shadow group relative"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img 
                        src={getFaviconUrl(bookmark.url)} 
                        alt="" 
                        className="w-8 h-8 rounded-md bg-gray-50 p-1 flex-shrink-0"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <a 
                        href={bookmark.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-gray-800 hover:text-indigo-600 truncate transition-colors"
                        title={bookmark.title}
                      >
                        {bookmark.title}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={bookmark.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-indigo-600 rounded bg-gray-50 hover:bg-indigo-50"
                        title="在新标签页打开"
                      >
                        <IconExternalLink />
                      </a>
                      <button 
                        onClick={() => handleDeleteBookmark(bookmark.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded bg-gray-50 hover:bg-red-50"
                        title="删除书签"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1" title={bookmark.description}>
                    {bookmark.description || '暂无描述'}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                    {bookmark.tags && bookmark.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md"
                      >
                        <IconTag />
                        {tag}
                        <button 
                          onClick={() => handleDeleteTagClick(bookmark.id, tag)}
                          className="text-indigo-300 hover:text-red-500 focus:outline-none ml-0.5 transition-colors"
                          title="删除标签"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="18" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </span>
                    ))}
                    
                    {addingTagId === bookmark.id ? (
                      <form onSubmit={(e) => handleAddTagSubmit(bookmark.id, e)} className="flex items-center">
                        <input
                          autoFocus
                          type="text"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onBlur={() => handleAddTagSubmit(bookmark.id)}
                          className="px-2 py-1 text-xs border border-indigo-300 rounded-md outline-none w-20 focus:ring-1 focus:ring-indigo-500 bg-white"
                          placeholder="回车确认"
                        />
                      </form>
                    ) : (
                      <button 
                        onClick={() => { setAddingTagId(bookmark.id); setNewTagInput(''); }}
                        className="inline-flex items-center justify-center px-1.5 py-1 rounded-md border border-dashed border-gray-300 text-gray-400 hover:text-indigo-500 hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-xs gap-0.5"
                        title="添加标签"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        添加
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* --- 模态框：添加/编辑书签 --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-800/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">添加新书签</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <IconX />
              </button>
            </div>
            <form onSubmit={handleSaveBookmark} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">网站名称 <span className="text-red-500">*</span></label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="例如：GitHub" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">网址 URL <span className="text-red-500">*</span></label>
                <input required type="text" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">所属分类</label>
                <select value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述信息</label>
                <textarea rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="简要描述这个网站..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标签 (用逗号分隔)</label>
                <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="前端, 设计, 工具..." />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">取消</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">保存书签</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- 模态框：分类编辑（包含 Emoji 自定义） --- */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-gray-800/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">{categoryForm.id ? '编辑分类' : '新建分类'}</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <IconX />
              </button>
            </div>
            <form onSubmit={handleSaveCategory} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类名称 <span className="text-red-500">*</span></label>
                <input autoFocus required type="text" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="例如：常用工具" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择图标</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CATEGORY_ICONS).map(([key, IconComponent]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCategoryForm({...categoryForm, icon: key})}
                      className={`p-2 rounded-lg border flex items-center justify-center transition-all ${categoryForm.icon === key ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                    >
                      <IconComponent />
                    </button>
                  ))}
                  {/* 自定义 Emoji 选项 */}
                  <button
                    type="button"
                    onClick={() => setCategoryForm({...categoryForm, icon: 'custom'})}
                    className={`p-2 rounded-lg border flex items-center justify-center transition-all ${categoryForm.icon === 'custom' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                    title="自定义 Emoji"
                  >
                    <IconSmile />
                  </button>
                </div>
              </div>

              {categoryForm.icon === 'custom' && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">输入 Emoji 图标</label>
                  <input 
                    type="text" 
                    maxLength={2}
                    value={categoryForm.customEmoji} 
                    onChange={e => setCategoryForm({...categoryForm, customEmoji: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-xl" 
                    placeholder="输入一个 Emoji (如 🚀)" 
                  />
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">取消</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                  {categoryForm.id ? '保存修改' : '确定创建'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- 模态框：删除确认（通用逻辑） --- */}
      {deleteBookmarkId !== null && (
        <div className="fixed inset-0 bg-gray-800/60 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 text-red-500 rounded-full">
                <IconWarning />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">确认删除书签？</h3>
              <p className="text-sm text-gray-500 mb-6">
                删除后将无法恢复，您确定要继续吗？
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteBookmarkId(null)}
                  className="flex-1 px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={confirmDeleteBookmark}
                  className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-medium shadow-sm transition-colors"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 模态框：删除分类确认 --- */}
      {deleteCategoryId !== null && (
        <div className="fixed inset-0 bg-gray-800/60 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 text-red-500 rounded-full">
                <IconWarning />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">确认删除整个分类？</h3>
              <p className="text-sm text-gray-500 mb-6">
                删除分类将**永久移除该分类下的所有书签**。此操作不可撤销。
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteCategoryId(null)}
                  className="flex-1 px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={confirmDeleteCategory}
                  className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-medium shadow-sm transition-colors"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 模态框：删除标签确认 --- */}
      {tagToDelete !== null && (
        <div className="fixed inset-0 bg-gray-800/60 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 text-red-500 rounded-full">
                <IconWarning />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">确认删除标签？</h3>
              <p className="text-sm text-gray-500 mb-6">
                您确定要移除标签 <span className="font-semibold text-gray-700">"{tagToDelete.tag}"</span> 吗？
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setTagToDelete(null)}
                  className="flex-1 px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={confirmDeleteTag}
                  className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-medium shadow-sm transition-colors"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}