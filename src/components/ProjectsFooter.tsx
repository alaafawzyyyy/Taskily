import PaginationButton from "./ui/paginationButton";

export default function ProjectFooter(){
    return(<div className=" hidden px-2 pt-12 md:flex justify-between items-center">
        <p className="text-[#434654] text-[12px] leading-4 font-medium ">Showing 5 of 24 active projects</p>
        <div className="flex gap-2">
            <PaginationButton number="<"/>
            <PaginationButton number="1"/>
            <PaginationButton number="2"/>
            <PaginationButton number=">"/>
        </div>
    </div>)
}