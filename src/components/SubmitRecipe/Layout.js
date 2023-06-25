import Nav from "../Box/Nav"
import Button from "../Button"

function SubmitRecipeLayout(props) {
    const { children, title } = props
    return (
        <>
            <header>
                <Nav className='nav__bar'>
                    <Button>iii</Button>
                    <Button>COOKBOOK</Button>
                    <Button style={{ marginLeft: 'auto' }}>CANCEL</Button>
                    <Button form="submit-recipe-form" type='submit'>
                        Save Recipe
                    </Button>
                </Nav>
            </header>
            <main>
                <h1 style={{ marginBlockStart: '6rem', marginBlockEnd: '0.75rem' }}>{title}</h1>
                {children}
            </main>

        </>
    )

}

export default SubmitRecipeLayout
