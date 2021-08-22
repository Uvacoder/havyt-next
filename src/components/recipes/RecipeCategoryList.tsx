import { FunctionComponent } from 'react'
import { useQuery } from 'urql'
import { RECIPE_CATEGORIES_QUERY } from '~/lib/graphql/queries'

type RecipeCategory = {
    id: string
    name: string
}

type AllRecipeCategoriesData = {
    allRecipeCategories: Array<RecipeCategory>
}

const RecipeCategoryList: FunctionComponent = () => {
    const [ result ] = useQuery<AllRecipeCategoriesData>({
      query: RECIPE_CATEGORIES_QUERY
    })

    const { data, fetching, error } = result

    if (fetching) return <p>Loading...</p>

    if (error) return <p>Oh no... {error.message}</p>

    return (
      <div>
        <p>There are {data?.allRecipeCategories.length} recipe category(s) in the database:</p>
        <ul>
          {data?.allRecipeCategories.map(recipeCategory => (
            <li key={recipeCategory.id}>{recipeCategory.name}</li>
          ))}
        </ul>
      </div>
    )
}

export default RecipeCategoryList
