<BarChart 
                key={activeTab} 
                data={data} 
                barGap={activeTab === 'anual' ? 4 : 0} 
                barCategoryGap="18%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#d0d0d0" vertical={false} horizontal={true} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={20}
                  wrapperStyle={{ paddingTop: '0px', marginTop: '-10px' }}
                />
                {activeTab === 'normal' && (
                  <Bar 
                    key="normal-current"
                    dataKey="current" 
                    fill="#0066cc" 
                    name="Vendas"
                    radius={[8, 8, 0, 0]}
                  />
                )}
                {activeTab === 'pbm' && (
                  <>
                    <Bar 
                      key="pbm-current"
                      dataKey="current" 
                      fill="#0066cc" 
                      name="Vendas Normais"
                      radius={[8, 8, 0, 0]}
                      stackId="stack"
                    />
                    <Bar 
                      key="pbm-previous"
                      dataKey="previous" 
                      fill="#424242" 
                      name="Vendas PBM"
                      radius={[8, 8, 0, 0]}
                      stackId="stack"
                    />
                  </>
                )}
                {activeTab === 'anual' && (
                  <>
                    <Bar 
                      key="anual-current"
                      dataKey="current" 
                      fill="#0066cc" 
                      name="Vendas Normais"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      key="anual-previous"
                      dataKey="previous" 
                      fill="#10b981" 
                      name="Vendas Ano Anterior"
                      radius={[8, 8, 0, 0]}
                    />
                  </>
                )}
              </BarChart>