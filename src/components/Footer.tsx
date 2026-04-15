function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center md:text-left">
            &copy; {currentYear} Car<span className="text-indigo-600 dark:text-indigo-400">Direct</span> Fleet Management. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-sm font-bold text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Documentation</a>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">v1.0.0</span>
          </div>



        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center md:text-left">
            findcar@gmal.com
          </div>
      </div>
    </footer>
  );
}

export default Footer;