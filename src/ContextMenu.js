import React, { PropTypes, Component } from "react"
import ReactDOM from "react-dom"
import Menu from "./Menu"

class ContextMenu extends Component {

  constructor(props) {

    super(props)

    this.state = { display : false, position : { x : 0, y : 0 } }

    this.handleBlurWindow = this.handleBlurWindow.bind(this)
    this.handleClickDoc = this.handleClickDoc.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }

  handleBlurWindow() {

    this.setState({ display : false })

  }

  handleClickDoc(e) {

    const node = ReactDOM.findDOMNode(this.menu)

    if (node && !node.contains(e.target)) this.setState({ display : false })

  }

  handleClick(e) {

    if (e.which !== 3) return

    e.stopPropagation()

    this.setState({ display : true })

    this.setPosition(e)

  }

  preventDefault(e) {

    e.preventDefault()

  }

  setPosition(e) {

    const menu = ReactDOM.findDOMNode(this.menu)
    const parent = menu && menu.offsetParent
    const dimParent = parent && parent.getBoundingClientRect()

    if (!menu) return

    let x = e.clientX - dimParent.left
    let y = e.clientY - dimParent.top

    if (e.clientX + menu.offsetWidth > window.innerWidth) {

      x -= menu.offsetWidth
      if (x < 0) x = window.innerWidth - menu.offsetWidth

    }

    if (e.clientY + menu.offsetHeight > window.innerHeight) {

      y -= menu.offsetHeight
      if (y < 0) y = window.innerHeight - menu.offsetHeight

    }

    this.setState({ position : { x, y } })

  }

  componentDidMount() {

    this.container.addEventListener("mouseup", this.handleClick)
    this.container.addEventListener("contextmenu", this.preventDefault)
    document.addEventListener("mouseup", this.handleClickDoc)
    window.addEventListener("blur", this.handleBlurWindow)

  }

  componentWillUnmount() {

    this.container.removeEventListener("mouseup", this.handleClick)
    this.container.removeEventListener("contextmenu", this.preventDefault)
    document.removeEventListener("mouseup", this.handleClickDoc)
    window.removeEventListener("blur", this.handleBlurWindow)

  }

  render() {

    const { children, ...rest } = this.props

    if (React.Children.count(children) !== 2) throw new Error("You should have exactly 2 children")

    const elmts = React.Children.toArray(children)

    let menu = elmts[0].type === Menu ? elmts[0] : elmts[1]
    const container = elmts[0].type === Menu ? elmts[1] : elmts[0]

    if (this.state.display) {

      menu = React.cloneElement(menu, {
        ref : elmt => this.menu = elmt,
        style : {
          left : this.state.position.x,
          top : this.state.position.y
        }
      })

    } else menu = null

    return React.cloneElement(container, {
      ref : elmt => this.container = elmt,
      ...rest
    }, menu)

  }

}

ContextMenu.propTypes = { children : PropTypes.node }

export default ContextMenu