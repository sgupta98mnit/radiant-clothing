import {Route, Routes} from 'react-router-dom';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = ({title, products}) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
            </h2>
            <div className='preview'>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <CategoryPreview key={product.id} {...product} />
                    ))}
            </div>
        </div>
    )
}
export default CategoriesPreview;