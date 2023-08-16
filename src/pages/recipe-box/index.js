import React from 'react'
import RecipeCard from '@/components/RecipeCard'

import { default as PATHS } from '../../../config'

import styles from '../../components/RecipeView/styles.module.scss'

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
        <div style={{ width: '100%', backgroundColor: '#F2F3EF' }}>
            <h2>This is your recipe box: {count}</h2>
            <div className={styles.cards__section}>
                {recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
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
