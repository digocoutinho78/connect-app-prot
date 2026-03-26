<div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Bairro, Loja ou Cidade / UF"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[10px] focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none bg-white"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#006eb4] text-white px-6 rounded-[10px] hover:bg-[#006eb4] transition-colors active:scale-95"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter('bairro')}
            className={`flex-1 py-1 px-4 rounded-[10px] font-medium transition-all active:scale-95 ${
              activeFilter === 'bairro'
                ? 'bg-[#006eb4] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Bairro
          </button>
          <button
            onClick={() => setActiveFilter('loja')}
            className={`flex-1 py-1 px-4 rounded-[10px] font-medium transition-all active:scale-95 ${
              activeFilter === 'loja'
                ? 'bg-[#006eb4] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Loja
          </button>
          <button
            onClick={() => setActiveFilter('cidade')}
            className={`flex-1 py-1 px-4 rounded-[10px] font-medium transition-all active:scale-95 ${
              activeFilter === 'cidade'
                ? 'bg-[#006eb4] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cidade / UF
          </button>
        </div>
      </div>