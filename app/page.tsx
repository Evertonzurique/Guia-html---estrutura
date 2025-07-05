"use client"

import { useState, useMemo } from "react"
import { Search, Code, Book, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HTMLElement {
  tag: string
  description: string
  category: string
  example?: string
  attributes?: string[]
}

const htmlElements: HTMLElement[] = [
  // Elementos Básicos
  {
    tag: "<!DOCTYPE html>",
    description: "Declara o tipo de documento e a versão do HTML (HTML5).",
    category: "Básicos",
  },
  {
    tag: "<html>",
    description: "Elemento raiz de uma página HTML. O atributo lang define o idioma do documento.",
    category: "Básicos",
    example: '<html lang="pt-BR">',
    attributes: ["lang"],
  },
  { tag: "<head>", description: "Contém meta-informações sobre o documento HTML.", category: "Básicos" },
  { tag: "<body>", description: "Contém todo o conteúdo visível do documento HTML.", category: "Básicos" },

  // Elementos de Metadados
  {
    tag: "<meta>",
    description: "Especifica metadados sobre o documento HTML.",
    category: "Metadados",
    example: '<meta charset="UTF-8" />',
    attributes: ["charset", "name", "content"],
  },
  {
    tag: "<title>",
    description: "Define o título do documento HTML (aparece na guia do navegador).",
    category: "Metadados",
  },
  {
    tag: "<link>",
    description: "Vincula recursos externos ao documento.",
    category: "Metadados",
    example: '<link rel="stylesheet" href="style.css">',
    attributes: ["rel", "href"],
  },

  // Elementos Estruturais
  { tag: "<header>", description: "Representa conteúdo introdutório ou links de navegação.", category: "Estruturais" },
  { tag: "<nav>", description: "Seção que fornece links de navegação.", category: "Estruturais" },
  { tag: "<main>", description: "Representa o conteúdo principal do documento.", category: "Estruturais" },
  { tag: "<section>", description: "Seção autônoma de conteúdo.", category: "Estruturais" },
  {
    tag: "<article>",
    description: "Conteúdo independente e auto-contido (como post de blog).",
    category: "Estruturais",
  },
  { tag: "<aside>", description: "Conteúdo relacionado indiretamente ao conteúdo principal.", category: "Estruturais" },
  { tag: "<footer>", description: "Rodapé para o documento ou seção.", category: "Estruturais" },
  { tag: "<div>", description: "Contêiner genérico para agrupamento e estilização.", category: "Estruturais" },

  // Elementos de Texto
  { tag: "<h1>", description: "Cabeçalho de nível 1 (mais importante).", category: "Texto" },
  { tag: "<h2>", description: "Cabeçalho de nível 2.", category: "Texto" },
  { tag: "<h3>", description: "Cabeçalho de nível 3.", category: "Texto" },
  { tag: "<h4>", description: "Cabeçalho de nível 4.", category: "Texto" },
  { tag: "<h5>", description: "Cabeçalho de nível 5.", category: "Texto" },
  { tag: "<h6>", description: "Cabeçalho de nível 6.", category: "Texto" },
  { tag: "<p>", description: "Parágrafo de texto.", category: "Texto" },
  { tag: "<span>", description: "Contêiner inline para estilização de partes do texto.", category: "Texto" },
  { tag: "<strong>", description: "Texto com forte importância (normalmente em negrito).", category: "Texto" },
  { tag: "<b>", description: "Texto em negrito (sem ênfase semântica).", category: "Texto" },
  { tag: "<em>", description: "Texto com ênfase (normalmente em itálico).", category: "Texto" },
  { tag: "<i>", description: "Texto em itálico (sem ênfase semântica).", category: "Texto" },

  // Elementos de Lista
  { tag: "<ul>", description: "Lista não ordenada.", category: "Listas" },
  { tag: "<ol>", description: "Lista ordenada (numerada).", category: "Listas" },
  { tag: "<li>", description: "Item de lista.", category: "Listas" },
  { tag: "<dl>", description: "Lista de definições.", category: "Listas" },
  { tag: "<dt>", description: "Termo de definição.", category: "Listas" },
  { tag: "<dd>", description: "Descrição de definição.", category: "Listas" },

  // Elementos de Mídia
  {
    tag: "<img>",
    description: "Incorporação de imagens.",
    category: "Mídia",
    example: '<img src="image.jpg" alt="Descrição">',
    attributes: ["src", "alt", "width", "height"],
  },
  {
    tag: "<video>",
    description: "Incorporação de vídeo nativo.",
    category: "Mídia",
    attributes: ["src", "controls", "autoplay"],
  },
  {
    tag: "<audio>",
    description: "Incorporação de áudio nativo.",
    category: "Mídia",
    attributes: ["src", "controls", "autoplay"],
  },
  {
    tag: "<iframe>",
    description: "Incorporação de outro documento HTML.",
    category: "Mídia",
    attributes: ["src", "width", "height"],
  },
  { tag: "<svg>", description: "Gráficos vetoriais escaláveis.", category: "Mídia" },
  {
    tag: "<canvas>",
    description: "Área para renderização de gráficos via JavaScript.",
    category: "Mídia",
    attributes: ["width", "height"],
  },

  // Elementos de Formulário
  {
    tag: "<form>",
    description: "Seção para controles interativos de envio de informações.",
    category: "Formulários",
    attributes: ["action", "method"],
  },
  {
    tag: "<input>",
    description: "Campo de entrada para dados.",
    category: "Formulários",
    example: '<input type="text" name="nome">',
    attributes: ["type", "name", "value", "placeholder"],
  },
  { tag: "<label>", description: "Legenda para um item de interface.", category: "Formulários", attributes: ["for"] },
  { tag: "<button>", description: "Botão clicável.", category: "Formulários", attributes: ["type"] },
  {
    tag: "<textarea>",
    description: "Área de texto multilinha.",
    category: "Formulários",
    attributes: ["rows", "cols"],
  },
  { tag: "<select>", description: "Menu suspenso.", category: "Formulários" },
  { tag: "<option>", description: "Opção em um menu suspenso.", category: "Formulários", attributes: ["value"] },
  { tag: "<fieldset>", description: "Agrupamento de controles de formulário.", category: "Formulários" },
  { tag: "<legend>", description: "Legenda para um fieldset.", category: "Formulários" },

  // Elementos de Hiperlink
  {
    tag: "<a>",
    description: "Cria um hiperlink para outra página ou seção.",
    category: "Links",
    example: '<a href="https://example.com">Link</a>',
    attributes: ["href", "target"],
  },

  // Elementos de Separação
  { tag: "<hr>", description: "Quebra temática entre elementos.", category: "Separação" },
  { tag: "<br>", description: "Quebra de linha.", category: "Separação" },

  // Elementos de Tabela
  { tag: "<table>", description: "Tabela de dados.", category: "Tabelas" },
  { tag: "<tr>", description: "Linha de tabela.", category: "Tabelas" },
  { tag: "<td>", description: "Célula de dados da tabela.", category: "Tabelas" },
  { tag: "<th>", description: "Célula de cabeçalho da tabela.", category: "Tabelas" },
  { tag: "<thead>", description: "Cabeçalho da tabela.", category: "Tabelas" },
  { tag: "<tbody>", description: "Corpo da tabela.", category: "Tabelas" },
  { tag: "<tfoot>", description: "Rodapé da tabela.", category: "Tabelas" },
]

const categories = Array.from(new Set(htmlElements.map((el) => el.category)))

const codeExamples = {
  basic: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minha Página</title>
    <link rel="stylesheet" href="estilo.css">
</head>
<body>
    <header>
        <h1>Bem-vindo ao meu site</h1>
    </header>
    <nav>
        <a href="#inicio">Início</a>
        <a href="#sobre">Sobre</a>
    </nav>
    <main>
        <section id="inicio">
            <p>Esta é a seção inicial.</p>
        </section>
        <section id="sobre">
            <p>Sobre mim.</p>
        </section>
    </main>
    <footer>
        <p>Todos os direitos reservados.</p>
    </footer>
</body>
</html>`,
  css: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}

header, footer {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
}

nav {
    background-color: #444;
    padding: 10px;
    text-align: center;
}

nav a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
}

main {
    padding: 20px;
}

section {
    margin-bottom: 20px;
}`,
}

export default function HTMLGuide() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredElements = useMemo(() => {
    return htmlElements.filter((element) => {
      const matchesSearch =
        element.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || element.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const SidebarContent = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Categorias</h3>
        <Button
          variant={selectedCategory === "Todos" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setSelectedCategory("Todos")
            setIsSidebarOpen(false)
          }}
        >
          Todos os Elementos
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setSelectedCategory(category)
              setIsSidebarOpen(false)
            }}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              <div className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Guia HTML</h1>
              </div>
            </div>
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar elementos HTML..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <SidebarContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Tabs defaultValue="elements" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="elements" className="flex items-center space-x-2">
                  <Book className="h-4 w-4" />
                  <span>Elementos</span>
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>Exemplos</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="elements" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === "Todos" ? "Todos os Elementos" : `Elementos ${selectedCategory}`}
                  </h2>
                  <Badge variant="secondary">
                    {filteredElements.length} elemento{filteredElements.length !== 1 ? "s" : ""}
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {filteredElements.map((element, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-mono text-blue-600">{element.tag}</CardTitle>
                          <Badge variant="outline">{element.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <CardDescription className="text-base">{element.description}</CardDescription>
                        {element.example && (
                          <div className="bg-gray-100 rounded-md p-3">
                            <p className="text-sm text-gray-600 mb-1">Exemplo:</p>
                            <code className="text-sm font-mono text-gray-800">{element.example}</code>
                          </div>
                        )}
                        {element.attributes && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Atributos comuns:</p>
                            <div className="flex flex-wrap gap-1">
                              {element.attributes.map((attr, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {attr}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredElements.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Nenhum elemento encontrado para "{searchTerm}"</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Exemplos de Código</h2>

                <Card>
                  <CardHeader>
                    <CardTitle>Estrutura Básica HTML</CardTitle>
                    <CardDescription>
                      Exemplo completo de uma página HTML básica com estrutura semântica
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-100 rounded-md p-4 overflow-x-auto text-sm">
                      <code>{codeExamples.basic}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>CSS Básico</CardTitle>
                    <CardDescription>Exemplo de estilização CSS para a estrutura HTML acima</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-100 rounded-md p-4 overflow-x-auto text-sm">
                      <code>{codeExamples.css}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
