import Alert from '@/components/Alert'
import Button from '@/components/Button'
import UnstyledButton from '@/components/Button/UnstyledButton'
import {
    IconAlertCircle,
    IconArrowDownRight,
    IconArrowForward,
    IconArrowNarrowRight,
    IconArrowRight,
    IconBookmark,
    IconCalendarEvent,
    IconCheck,
    IconChecklist,
    IconChefHat,
    IconChevronUp,
    IconChevronsUp,
    IconCloudUpload,
    IconCross,
    IconDotsVertical,
    IconEqual,
    IconGripVertical,
    IconLoader,
    IconMenuOrder,
    IconMinus,
    IconNotebook,
    IconPlus,
    IconShoppingCartPlus,
    IconTrash,
    IconVerticalEllipsis
} from '@/components/Icon'

import IconGridDots from '@/components/Icon/icons/icon-grid-dots'
import NavBar from '@/components/Navigation'

import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

    return (
        <>
            <Head>
                <title>Cookbook V2</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main>
                <h2>
                    Action Buttons:
                </h2>
                <Button appearance='danger'>
                    <IconChefHat />
                </Button>
                <h2>
                    Label Buttons:
                </h2>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexFlow: 'row wrap', gap: '1rem', marginBlockEnd: '2rem' }}>
                    <div style={{ width: '200px' }}>
                        <Button uppercase>Cancel any time, entrance, front entrance</Button>
                    </div>
                    <Button uppercase leftIcon={<IconBookmark size={20} />}>Cancel</Button>
                    <Button appearance='danger' rightIcon={<IconGridDots size={16} />}>Super Button</Button>
                    <Button appearance='danger' leftIcon={<IconGridDots size={16} />} rightIcon={<IconGridDots size={16} />}>Button</Button>

                    <Button appearance='secondary' compact leftIcon={<IconCheck size={16} />}>Button</Button>
                    <Button appearance='secondary' rightIcon={<IconCheck size={16} />} >Button</Button>
                    <Button appearance='secondary' leftIcon={<IconCheck size={16} />} rightIcon={<IconCheck size={16} />}>Button</Button>
                </div>
                <div>
                    <IconAlertCircle />
                    <IconArrowDownRight />
                    <IconArrowRight />
                    <IconArrowNarrowRight />
                    <IconArrowForward />
                    <IconBookmark />
                    <IconCalendarEvent />
                    <IconCheck />
                    <IconCross />
                    <IconChecklist />
                    <IconChefHat />
                    <IconChevronUp />
                    <IconChevronsUp />
                    <IconCloudUpload />
                    <IconDotsVertical />
                    <IconEqual />
                    <IconGripVertical />
                    <IconLoader />
                    <IconMenuOrder />
                    <IconMinus />
                    <IconNotebook />
                    <IconGridDots />
                    <IconPlus />
                    <IconShoppingCartPlus />
                    <IconTrash />
                    <IconVerticalEllipsis />
                </div>
            </main>
        </>
    )
}
/**
 
                <Link href="/new">Create recipe</Link>
                <p style={{ fontSize: '16px', lineHeight: '1.5' }}>The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's De finibus bonorum et malorum. The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand (even) pages, breaks off on page 34 with "Neque porro quisquam est qui do-" and continues on page 36 with "lorem ipsum ...", suggesting that the galley type of that page was mixed up to make the dummy text seen today.
                    <br />
                    The discovery of the text's origin is attributed to Richard McClintock, a Latin scholar at Hampden–Sydney College. McClintock connected Lorem ipsum to Cicero's writing sometime before 1982 while searching for instances of the Latin word consectetur, which was rarely used in classical literature.[4] McClintock first published his discovery in a 1994 letter to the</p>
                <hr />
                <hr />

                <h2>
                    Action Buttons:
                </h2>
                <Button appearance='danger'>
                    <IconChefHat />
                </Button>
                <h2>
                    Label Buttons:
                </h2>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexFlow: 'row wrap', gap: '1rem', marginBlockEnd: '2rem' }}>
                    <Button uppercase leftIcon={<IconCalendarEvent size={18} />}>Cancel</Button>
                    <Button appearance='danger' rightIcon={<IconGridDots size={16} />}>Super Button</Button>
                    <Button appearance='danger' leftIcon={<IconGridDots size={16} />} rightIcon={<IconGridDots size={16} />}>Button</Button>

                    <Button appearance='secondary' compact leftIcon={<IconCheck size={16} />}>Button</Button>
                    <Button appearance='secondary' rightIcon={<IconCheck size={16} />} >Button</Button>
                    <Button appearance='secondary' leftIcon={<IconCheck size={16} />} rightIcon={<IconCheck size={16} />}>Button</Button>
                </div>
                <hr />
                <hr />

                <hr />
                <hr />
                <Alert appearance="danger" title="Error">
                    This is danger, I am danger. <a href='/'>Follow the rabbit.</a>
                </Alert>
                <Alert appearance="danger" title="Error" variant="outline">Hakuna Matata</Alert>
                <Alert appearance="danger" title="Error" variant="light" removable>Hey!</Alert>

                <Alert appearance="success" title="Success" removable>This is success, I am success.</Alert>
                <Alert appearance="success" title="Success" variant="outline">Hakuna Matata</Alert>
                <Alert appearance="success" title="Success" variant="light">Hey!</Alert>

                <Alert appearance="info" title="Info">This is info, I am Info.</Alert>
                <Alert appearance="info" title="Info" variant="outline" removable>Hakuna Matata</Alert>
                <Alert appearance="info" title="Info" variant="light">Hey!</Alert>


 */