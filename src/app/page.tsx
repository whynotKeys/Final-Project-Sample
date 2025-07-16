import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Keyboard, ArrowRight } from "lucide-react";
import KeyboardShake from "@/lib/shakeKey";

export default function HomePage() {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
    //   <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-primary-100">
    //     <div className="max-w-6xl mx-auto px-4 py-6">
    //       <div className="flex justify-between items-center">
    //         <div className="flex items-center space-x-3">
    //           <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
    //             <Keyboard className="w-6 h-6 text-white" />
    //           </div>
    //           <h1 className="text-2xl font-bold text-primary">KeyCraft</h1>
    //         </div>
    //         <div className="space-x-3">
    //           <Link href="/login">
    //             <Button
    //               variant="outline"
    //               className="border-primary-200 text-primary hover:bg-primary-50 bg-transparent"
    //             >
    //               로그인
    //             </Button>
    //           </Link>
    //           <Link href="/signup">
    //             <Button className="bg-primary hover:bg-primary-600 text-white">회원가입</Button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </header>

    //   <main className="max-w-6xl mx-auto px-4 py-16">
    //     <div className="text-center space-y-8">
    //       <div className="space-y-4">
    //         <h2 className="text-5xl font-bold text-primary leading-tight">
    //           완벽한 타이핑을 위한
    //           <br />
    //           <span className="text-secondary-600">프리미엄 키보드</span>
    //         </h2>
    //         <p className="text-xl text-primary-400 max-w-2xl mx-auto">
    //           장인정신으로 제작된 최고급 키보드로 당신의 작업 환경을 업그레이드하세요
    //         </p>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
    //         <Link href="/signup" className="group">
    //           <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 hover:border-primary-200 hover:-translate-y-1">
    //             <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
    //               <span className="text-2xl text-white">👤</span>
    //             </div>
    //             <h3 className="text-xl font-semibold text-primary mb-2">회원가입</h3>
    //             <p className="text-primary-400 mb-4">새로운 계정을 만들어 KeyCraft의 멤버가 되어보세요</p>
    //             <ArrowRight className="w-5 h-5 text-secondary-600 mx-auto group-hover:translate-x-1 transition-transform" />
    //           </div>
    //         </Link>

    //         <Link href="/login" className="group">
    //           <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 hover:border-primary-200 hover:-translate-y-1">
    //             <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
    //               <span className="text-2xl text-white">🔑</span>
    //             </div>
    //             <h3 className="text-xl font-semibold text-primary mb-2">로그인</h3>
    //             <p className="text-primary-400 mb-4">기존 계정으로 로그인하여 쇼핑을 계속하세요</p>
    //             <ArrowRight className="w-5 h-5 text-secondary-600 mx-auto group-hover:translate-x-1 transition-transform" />
    //           </div>
    //         </Link>

    //         <Link href="/profile" className="group">
    //           <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 hover:border-primary-200 hover:-translate-y-1">
    //             <div className="w-16 h-16 bg-gradient-to-br from-primary-300 to-secondary-400 rounded-xl flex items-center justify-center mx-auto mb-4">
    //               <span className="text-2xl text-white">⚙️</span>
    //             </div>
    //             <h3 className="text-xl font-semibold text-primary mb-2">회원정보</h3>
    //             <p className="text-primary-400 mb-4">개인정보를 관리하고 설정을 변경하세요</p>
    //             <ArrowRight className="w-5 h-5 text-secondary-600 mx-auto group-hover:translate-x-1 transition-transform" />
    //           </div>
    //         </Link>
    //       </div>
    //     </div>
    //   </main>

    //   <footer className="bg-primary text-white py-12 mt-24">
    //     <div className="max-w-6xl mx-auto px-4">
    //       <div className="flex flex-col md:flex-row justify-between items-center">
    //         <div className="flex items-center space-x-3 mb-4 md:mb-0">
    //           <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
    //             <Keyboard className="w-5 h-5 text-primary" />
    //           </div>
    //           <span className="text-xl font-bold">KeyCraft</span>
    //         </div>
    //         <p className="text-primary-200">&copy; 2024 KeyCraft. 모든 권리 보유.</p>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
    <KeyboardShake />
  );
}
