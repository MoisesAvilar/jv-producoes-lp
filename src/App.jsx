import React, { useState, useEffect, useRef } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import {
    Play,
    Camera,
    Video,
    Megaphone,
    Users,
    Award,
    CheckCircle,
    Mail,
    Phone,
    MapPin,
    Menu,
    X,
    Maximize // Ícone importado
} from 'lucide-react';
import './App.css';

// Import videos
import video1 from './assets/IMG_4359.MOV';
import video2 from './assets/IMG_4360.MOV';
import video3 from './assets/IMG_4361.MOV';
import video4 from './assets/IMG_4362.MOV';
import video5 from './assets/IMG_4364.MOV';

const videos = [video1, video2, video3, video4, video5];

function App() {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [playingVideo, setPlayingVideo] = useState(null);
    const videoRefs = useRef([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // Auto-rotate videos in hero section
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Effect to control video playback
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (playingVideo === index) {
                video?.play();
            } else {
                video?.pause();
            }
        });
    }, [playingVideo]);

    const handleVideoPlay = (index) => {
        if (playingVideo === index) {
            setPlayingVideo(null); // Pauses the video if it's already playing
        } else {
            setPlayingVideo(index); // Plays the clicked video
        }
    };

    // Função para ativar o modo de tela cheia
    const handleFullscreen = (index) => {
        const videoEl = videoRefs.current[index];
        if (videoEl && videoEl.requestFullscreen) {
            videoEl.requestFullscreen();
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Obrigado pelo contato! Entraremos em contato em breve.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const services = [
        {
            icon: <Megaphone className="w-8 h-8" />,
            title: "Marketing Digital",
            description: "Estratégias completas para aumentar sua presença online e gerar mais leads."
        },
        {
            icon: <Camera className="w-8 h-8" />,
            title: "Filmagens Profissionais",
            description: "Produção de vídeos corporativos, eventos e conteúdo promocional de alta qualidade."
        },
        {
            icon: <Video className="w-8 h-8" />,
            title: "Edição de Vídeo",
            description: "Pós-produção profissional com efeitos visuais e sonoros de última geração."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Gestão de Redes Sociais",
            description: "Criação e gerenciamento de conteúdo para todas as plataformas sociais."
        }
    ];

    const differentials = [
        "Equipamentos de última geração",
        "Equipe especializada e experiente",
        "Atendimento personalizado",
        "Resultados comprovados",
        "Prazos cumpridos rigorosamente",
        "Suporte completo pós-entrega"
    ];

    return (
        <div className="min-h-screen bg-background text-foreground smooth-scroll">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass-effect">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-gradient">
                        JV PRODUÇÕES
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">
                            Início
                        </button>
                        <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">
                            Sobre
                        </button>
                        <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">
                            Serviços
                        </button>
                        <button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors">
                            Portfolio
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">
                            Contato
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-card border-t border-border">
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            <button onClick={() => scrollToSection('home')} className="block hover:text-primary transition-colors">
                                Início
                            </button>
                            <button onClick={() => scrollToSection('about')} className="block hover:text-primary transition-colors">
                                Sobre
                            </button>
                            <button onClick={() => scrollToSection('services')} className="block hover:text-primary transition-colors">
                                Serviços
                            </button>
                            <button onClick={() => scrollToSection('portfolio')} className="block hover:text-primary transition-colors">
                                Portfolio
                            </button>
                            <button onClick={() => scrollToSection('contact')} className="block hover:text-primary transition-colors">
                                Contato
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <video
                    key={currentVideo}
                    autoPlay
                    muted
                    loop
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={videos[currentVideo]} type="video/mp4" />
                </video>
                <div className="absolute inset-0 hero-gradient"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Sua <span className="text-gradient">visão</span>, nossa <span className="text-gradient">criação</span>!
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                        Somos a JV Produções, especialistas em marketing digital e filmagens profissionais que transformam ideias em resultados.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6 hover-scale"
                            onClick={() => scrollToSection('services')}
                        >
                            Conheça Nossos Serviços
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg px-8 py-6 hover-scale"
                            onClick={() => scrollToSection('portfolio')}
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Ver Portfolio
                        </Button>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {videos.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentVideo ? 'bg-primary' : 'bg-white/30'
                                }`}
                            onClick={() => setCurrentVideo(index)}
                        />
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Quem <span className="text-gradient">Somos</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Mais que uma agência de marketing e produção audiovisual, proporcionamos aos nossos clientes
                            a experiência de ter ao seu lado uma empresa que preza por todos os processos de crescimento
                            dentro de um mercado que se atualiza diariamente.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Nossa Missão</h3>
                            <p className="text-muted-foreground mb-6">
                                Transformar a visão dos nossos clientes em realidade através de soluções criativas
                                e estratégicas em produção audiovisual. Acreditamos que cada
                                projeto é único e merece uma abordagem personalizada.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {differentials.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-accent" />
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <Card className="glass-effect hover-scale">
                                <CardContent className="p-8 text-center">
                                    <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                                    <h4 className="text-2xl font-bold mb-2">Excelência</h4>
                                    <p className="text-muted-foreground">
                                        Comprometidos com a qualidade e inovação em cada projeto que desenvolvemos.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 px-4 bg-card">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Nossos <span className="text-gradient">Serviços</span>
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Soluções completas para elevar sua marca ao próximo nível
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="hover-scale cursor-pointer group">
                                <CardContent className="p-6 text-center">
                                    <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button
                            size="lg"
                            className="hover-scale"
                            onClick={() => scrollToSection('contact')}
                        >
                            Solicitar Orçamento
                        </Button>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Nosso <span className="text-gradient">Portfolio</span>
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Confira alguns dos nossos trabalhos mais recentes
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video, index) => (
                            <Card key={index} className="overflow-hidden hover-scale group">
                                <div className="relative">
                                    <video
                                        ref={el => videoRefs.current[index] = el}
                                        className="w-full h-48 object-cover"
                                        loop
                                        playsInline
                                        onClick={() => handleVideoPlay(index)}
                                    >
                                        <source src={video} type="video/mp4" />
                                    </video>
                                    
                                    {/* Overlay com botão de Play */}
                                    <div
                                        className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity cursor-pointer
                                        ${playingVideo === index ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                                        onClick={() => handleVideoPlay(index)}
                                    >
                                        {playingVideo !== index && <Play className="w-12 h-12 text-white" />}
                                    </div>

                                    {/* Botão de Tela Cheia */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Impede que o clique acione o play/pause
                                            handleFullscreen(index);
                                        }}
                                        className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                                        aria-label="Ver em tela cheia"
                                    >
                                        <Maximize className="w-4 h-4" />
                                    </button>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-bold mb-2">Projeto {index + 1}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Produção audiovisual profissional com foco em qualidade e criatividade.
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4 bg-card">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Pronto para <span className="text-gradient">Transformar</span> sua Marca?
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Entre em contato conosco e vamos criar algo incrível juntos
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Fale Conosco</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <span>contato@jvproducoes.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <span>(73) 99931-4550</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span>Teixeira de Freitas - BA</span>
                                </div>
                            </div>
                        </div>
                        <Card>
                            <CardContent className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input
                                        name="name"
                                        placeholder="Seu nome"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Seu e-mail"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        name="phone"
                                        placeholder="Seu telefone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    <Textarea
                                        name="message"
                                        placeholder="Sua mensagem"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Button type="submit" className="w-full hover-scale">
                                        Enviar Mensagem
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-border">
                <div className="container mx-auto text-center">
                    <div className="text-2xl font-bold text-gradient mb-4">
                        JV PRODUÇÕES
                    </div>
                    <p className="text-muted-foreground">
                        © 2025 JV Produções. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;