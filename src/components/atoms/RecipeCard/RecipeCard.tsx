
type RecipeCardProps = {
    onClick?: () => void
    imageSrc?: string
    title?: string
    category?: string
}

const RecipeCard = ({ onClick, title, imageSrc, category }: RecipeCardProps) => {
    return (
        <div
            className="border border-[#D3D3d3] rounded p-2 hover:bg-gray-300 cursor-pointer transition-colors"
            onClick={() => onClick?.()}
        >
            <img
                src={imageSrc}
                alt={title}
                className="w-full h-32 object-cover rounded"
            />
            <p className="mt-2 font-bold text-base md:text-xl">{title}</p>
            <span className=" text-gray-600 text-xs md:text-base">{category}</span>
        </div>
    )
}

export default RecipeCard