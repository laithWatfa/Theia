export default function Header({pageName}:{pageName:string}){
    
    return <header className="flex items-center justify-between mb-6 h-[45px] px-6 border-b-2">
        <h1 className="text-xl md:text-3xl font-bold">{pageName}</h1>
      </header>
}