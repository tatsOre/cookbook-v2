import Backdrop from '../Backdrop'
import InPortal from '../InPortal'
import Loader from '.'

function LoaderOverlay({ light }) {
  return (
    <InPortal id="portal-container">
      <Backdrop light={light}>
        <Loader />
      </Backdrop>
    </InPortal>
  )
}

export default LoaderOverlay
