"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Shuffle, Lock, Unlock, Copy, Palette, Sparkles, Check } from "lucide-react"

interface ColorCard {
  hex: string
  locked: boolean
  copied: boolean
}

export default function ColorPaletteGenerator() {
  const { toast } = useToast()

  // Função para gerar cor hexadecimal aleatória
  const generateRandomColor = useCallback((): string => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }, [])

  // Estado inicial com 5 cores aleatórias
  const [colors, setColors] = useState<ColorCard[]>(() =>
    Array.from({ length: 5 }, () => ({
      hex: generateRandomColor(),
      locked: false,
      copied: false,
    })),
  )

  // Gerar nova paleta (mantendo cores bloqueadas)
  const generateNewPalette = useCallback(() => {
    setColors((prevColors) =>
      prevColors.map((color) => (color.locked ? color : { ...color, hex: generateRandomColor(), copied: false })),
    )
    toast({
      title: "✨ Nova paleta gerada!",
      description: "Cores não bloqueadas foram atualizadas.",
    })
  }, [generateRandomColor, toast])

  // Alternar bloqueio de uma cor
  const toggleLock = useCallback(
    (index: number) => {
      setColors((prevColors) =>
        prevColors.map((color, i) => (i === index ? { ...color, locked: !color.locked } : color)),
      )

      const newState = !colors[index].locked
      toast({
        title: newState ? "🔒 Cor bloqueada!" : "🔓 Cor desbloqueada!",
        description: newState
          ? "Esta cor será mantida na próxima geração."
          : "Esta cor será alterada na próxima geração.",
      })
    },
    [colors, toast],
  )

  // Copiar código HEX para área de transferência
  const copyToClipboard = useCallback(
    async (hex: string, index: number) => {
      try {
        await navigator.clipboard.writeText(hex)

        // Ativar animação de cópia
        setColors((prevColors) => prevColors.map((color, i) => (i === index ? { ...color, copied: true } : color)))

        // Remover animação após 2 segundos
        setTimeout(() => {
          setColors((prevColors) => prevColors.map((color, i) => (i === index ? { ...color, copied: false } : color)))
        }, 2000)

        toast({
          title: "📋 Copiado!",
          description: `Código ${hex} copiado para a área de transferência.`,
        })
      } catch (err) {
        toast({
          title: "❌ Erro ao copiar",
          description: "Não foi possível copiar o código para a área de transferência.",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  // Verificar se a cor é clara ou escura para ajustar o texto
  const isLightColor = useCallback((hex: string): boolean => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho melhorado */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg">
                <Palette className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Gerador de Paletas
            </h1>
            <p className="text-xl text-gray-600 mb-2">Crie paletas incríveis com um clique</p>
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <Copy className="h-4 w-4" />
              Clique em uma cor para copiar o código HEX
            </p>
          </div>

          {/* Paleta de Cores melhorada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {colors.map((color, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
                  color.locked ? "ring-4 ring-yellow-400 ring-opacity-60" : ""
                } ${
                  color.copied ? "ring-4 ring-green-400 ring-opacity-80 scale-105 shadow-2xl shadow-green-500/25" : ""
                } backdrop-blur-sm bg-white/80 border-0 shadow-xl`}
                onClick={() => copyToClipboard(color.hex, index)}
              >
                <CardContent className="p-0 relative overflow-hidden rounded-lg">
                  {/* Área da cor */}
                  <div
                    className={`h-56 w-full transition-all duration-500 relative ${
                      color.copied ? "animate-pulse" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Botão de bloqueio melhorado */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-3 right-3 transition-all duration-300 transform hover:scale-110 z-20 ${
                        color.locked
                          ? "opacity-100 bg-yellow-400/90 hover:bg-yellow-500/90 text-gray-800"
                          : "opacity-0 group-hover:opacity-100 bg-white/20 hover:bg-white/30"
                      } ${
                        isLightColor(color.hex) && !color.locked ? "text-gray-800" : !color.locked ? "text-white" : ""
                      } backdrop-blur-sm rounded-full p-2 shadow-lg`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLock(index)
                      }}
                    >
                      {color.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                    </Button>

                    {/* Ícone de cópia melhorado com animação */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                        color.copied ? "opacity-100 bg-green-500/20" : "opacity-0 group-hover:opacity-100 bg-black/10"
                      }`}
                    >
                      <div
                        className={`p-4 rounded-full transition-all duration-300 transform ${
                          color.copied ? "scale-125 bg-green-500/30" : "group-hover:scale-110"
                        } ${!color.copied && (isLightColor(color.hex) ? "bg-gray-800/20" : "bg-white/20")}`}
                      >
                        {color.copied ? (
                          <Check className={`h-8 w-8 text-green-600 animate-bounce`} />
                        ) : (
                          <Copy className={`h-8 w-8 ${isLightColor(color.hex) ? "text-gray-800" : "text-white"}`} />
                        )}
                      </div>
                    </div>

                    {/* Indicador de cor bloqueada */}
                    {color.locked && (
                      <div className="absolute bottom-3 left-3 bg-yellow-400/90 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm">
                        <Lock className="h-3 w-3" />
                        Bloqueada
                      </div>
                    )}

                    {/* Indicador de copiado */}
                    {color.copied && (
                      <div className="absolute bottom-3 left-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm animate-bounce">
                        <Check className="h-3 w-3" />
                        Copiado!
                      </div>
                    )}

                    {/* Efeito de ondas quando copiado */}
                    {color.copied && (
                      <>
                        <div className="absolute inset-0 border-4 border-green-400 rounded-lg animate-ping opacity-75"></div>
                        <div className="absolute inset-2 border-2 border-green-300 rounded-lg animate-ping opacity-50 animation-delay-200"></div>
                      </>
                    )}
                  </div>

                  {/* Código HEX melhorado */}
                  <div
                    className={`p-6 transition-all duration-300 ${
                      color.copied
                        ? "bg-gradient-to-r from-green-50 to-green-100"
                        : "bg-gradient-to-r from-white to-gray-50"
                    }`}
                  >
                    <p
                      className={`text-center font-mono text-xl font-bold mb-1 transition-colors duration-300 ${
                        color.copied ? "text-green-700" : "text-gray-800"
                      }`}
                    >
                      {color.hex}
                    </p>
                    <p
                      className={`text-center text-sm transition-colors duration-300 ${
                        color.copied ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {color.copied ? "Copiado!" : "Clique para copiar"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão para gerar nova paleta melhorado */}
          <div className="text-center mb-8">
            <Button
              onClick={generateNewPalette}
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold px-12 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 text-lg group"
            >
              <Shuffle className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
              Nova Paleta
              <Sparkles className="ml-3 h-6 w-6 group-hover:animate-pulse" />
            </Button>
          </div>

          {/* Instruções melhoradas */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Como usar
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <Copy className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Copiar Cores</h4>
                  <p className="text-gray-600 text-sm">Clique em qualquer cor para copiar o código HEX</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Bloquear Cores</h4>
                  <p className="text-gray-600 text-sm">Clique no cadeado para manter uma cor favorita</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <Shuffle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Gerar Paletas</h4>
                  <p className="text-gray-600 text-sm">Use o botão para criar novas combinações</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
