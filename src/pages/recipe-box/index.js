import Image from 'next/image'
import { default as PATHS } from '../../../config'

import styles from '../../components/RecipeView/styles.module.scss'
import { useRouter } from 'next/router'
import React from 'react'

const Article = ({ rec }) => {
    const router = useRouter()

    const def = 'https://res.cloudinary.com/dshl3pgv4/image/upload/v1634436530/cookbook/36f888d8a2ce3b4a1448563f1eb9b53d_hq3nu7.jpg'

    const deleteRecipe = async (id) => {
        const response = await fetch(`${PATHS.RECIPES_ENDPOINT}/${rec._id}`,
            { method: 'DELETE' }
        )

        if (response.ok) {
            //console.log(await response.json())
            router.replace(router.asPath);
        } else {
            console.log('something happened')
        }
    }
    return (
        <article>
            <header>
                <Image fill={true} src={rec.photo || def} alt='photo' />
            </header>
            <div>
                <div>
                    {rec.categories?.length
                        && rec.categories.map(cat => <span key={cat.label}>{cat.label}</span>)}
                    {rec.cuisine && <span>{rec.cuisine.label}</span>}
                </div>

                <h3>{rec.title}</h3>

                <span>By: Lipa Echeverry</span>
            </div>
            <button onClick={deleteRecipe}>Delete</button>
        </article>
    )
}

function Layout({ recipes }) {
    const [count, setCount] = React.useState(0)
    
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(PATHS.RECIPES_ENDPOINT, {
                credentials: 'include'
            })

            if (response.ok) {
                const { data } = await response.json()
                setCount(data.length)

            } else {
                console.log('something happened in the useEffect')
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h2>This is your recipe box: {count}</h2>
            <div className={styles.cards__section}>

                {recipes.map((rec, index) => {
                    return (
                        <Article key={index} rec={rec} />
                    )
                })}
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    try {
        const response = await fetch(PATHS.RECIPES_ENDPOINT, {
            credentials: "include"
        })

        if (response.ok) {
            const { data } = await response.json()
            return { props: { data } }
        }
        return { notFound: true }

    } catch (err) {
        console.log(err.message)
        return { notFound: true }
    }
}

function Page({ data }) {
    return (
        <>
            <Layout recipes={data} />
        </>
    )
}

export default Page
