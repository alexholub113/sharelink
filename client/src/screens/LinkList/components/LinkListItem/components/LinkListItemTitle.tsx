const LinkListItemTitle = ({ title }: { title: string}) => {
    return (
        <h5 className="text-lg font-semibold secondary-text-color
            ">
            { title?.length > 55 ? `${title?.slice(0, 55)}...` : title }
        </h5>
    );
}

export default LinkListItemTitle;
