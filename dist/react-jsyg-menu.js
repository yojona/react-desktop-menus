"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* globals React, ReactDOM */
(function () {

  "use strict";

  var styles = {

    ul: {
      position: "absolute",
      backgroundColor: "white",
      border: "1px solid gray",
      borderRadius: 2,
      boxShadow: "2px 1px 1px gray",
      listStyle: "none",
      padding: "3px 0px",
      margin: 0,
      lineHeight: "normal"
    },

    li: {
      margin: 0,
      whiteSpace: "nowrap",
      lineHeight: "140%"
    },

    divider: {
      borderBottom: "1px solid #ccc",
      width: "100%"
    },

    a: {
      color: "#333",
      textDecoration: "none",
      display: "block",
      padding: "2px 5px",
      backgroundPosition: "5px 50%",
      backgroundSize: "16px 16px",
      backgroundRepeat: "no-repeat",
      position: "relative",
      cursor: "default"
    },

    icon: {
      display: "inline-block",
      width: 16,
      verticalAlign: "middle"
    },

    checkbox: {
      display: "inline-block",
      width: 16,
      verticalAlign: "middle",
      color: "black"
    },

    active: { backgroundColor: "#e5ecff" },

    disabled: {
      color: "gray",
      fontStyle: "italic",
      cursor: "not-allowed"
    },

    globalShortcut: {
      color: "gray",
      display: "inline-block",
      float: "right"
    },

    label: { marginRight: 15 },

    arrow: {
      display: "inline-block",
      float: "right",
      fontSize: 9
    },

    disabledInput: { cursor: "not-allowed" }
  };

  var MenuItem = function (_React$Component) {
    _inherits(MenuItem, _React$Component);

    function MenuItem(props) {
      _classCallCheck(this, MenuItem);

      var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

      _this.handleAction = _this.handleAction.bind(_this);
      _this.handleKeyPress = _this.handleKeyPress.bind(_this);
      _this.handleMouseOver = _this.handleMouseOver.bind(_this);
      _this.handleMouseOut = _this.handleMouseOut.bind(_this);

      _this.state = {
        checked: false,
        active: false,
        submenuPosition: { left: 0, top: 0 }
      };

      return _this;
    }

    _createClass(MenuItem, [{
      key: "handleAction",
      value: function handleAction(e) {

        e.preventDefault();

        if (this.props.disabled) return;

        if (this.props.action) this.props.action(e, !this.state.checked);

        this.setState({
          active: true,
          checked: !this.state.checked
        });
      }
    }, {
      key: "handleKeyPress",
      value: function handleKeyPress(e) {

        if (e.key === this.props.shortcut) this.handleAction(e);
      }
    }, {
      key: "handleMouseOver",
      value: function handleMouseOver() {

        this.setState({ active: true });
      }
    }, {
      key: "handleMouseOut",
      value: function handleMouseOut() {

        // this.setState({ active : false })

      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {

        this.setState({
          checked: this.props.defaultChecked,
          active: this.props.defaultActive
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {

        if (this.props.shortcut) {

          document.addEventListener("keypress", this.handleKeyPress);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {

        document.removeEventListener("keypress", this.handleKeyPress);
      }
    }, {
      key: "getStyle",
      value: function getStyle() {

        var stateStyle = _extends({}, styles.a);

        if (this.state.active) stateStyle = _extends({}, stateStyle, styles.active);

        if (this.props.disabled) stateStyle = _extends({}, stateStyle, styles.disabled);

        return stateStyle;
      }
    }, {
      key: "createLabel",
      value: function createLabel() {
        var _props = this.props,
            shortcut = _props.shortcut,
            children = _props.children;
        var label = this.props.label;


        if (typeof children === "string") label = children;

        if (shortcut) {

          var index = label.toLowerCase().indexOf(shortcut.toLowerCase());

          return React.createElement(
            "span",
            { style: styles.label },
            label.slice(0, index),
            React.createElement(
              "u",
              null,
              label.slice(index, index + 1)
            ),
            label.slice(index + 1)
          );
        } else {

          return React.createElement(
            "span",
            { style: styles.label },
            label
          );
        }
      }
    }, {
      key: "createIcon",
      value: function createIcon() {
        var _props2 = this.props,
            icon = _props2.icon,
            checkbox = _props2.checkbox;
        var checked = this.state.checked;


        if (checkbox) {

          return React.createElement(
            "span",
            { style: styles.checkbox },
            checked ? "☑" : "☐"
          );
        } else {

          return React.createElement(
            "span",
            { style: styles.icon },
            typeof icon === "string" ? React.createElement("i", { className: icon }) : icon
          );
        }
      }
    }, {
      key: "createSubmenu",
      value: function createSubmenu() {
        var _this2 = this;

        return React.cloneElement(this.props.children, {
          display: this.state.active,
          style: _extends({ position: "absolute" }, this.state.submenuPosition),
          ref: function ref(node) {
            return _this2.submenu = node;
          }
        });
      }
    }, {
      key: "hasSubmenu",
      value: function hasSubmenu() {
        var children = this.props.children;


        return children && typeof children !== "string";
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevPRops, prevState) {

        if (this.state.active && !prevState.active && this.hasSubmenu()) {

          this.setSubmenuPosition();
        }
      }
    }, {
      key: "setSubmenuPosition",
      value: function setSubmenuPosition() {

        var li = ReactDOM.findDOMNode(this);
        var dim = li.getBoundingClientRect();
        var sub = ReactDOM.findDOMNode(this.submenu);

        var left = li.offsetWidth;
        var top = li.offsetTop;

        if (dim.right + sub.offsetWidth > window.innerWidth) left = -sub.offsetWidth;

        if (dim.bottom + sub.offsetHeight > window.innerHeight) top = li.offsetTop + li.offsetHeight - sub.offsetHeight;

        this.setState({ submenuPosition: { left: left, top: top } });
      }
    }, {
      key: "render",
      value: function render() {
        var _props3 = this.props,
            style = _props3.style,
            action = _props3.action,
            rest = _objectWithoutProperties(_props3, ["style", "action"]);

        var submenu = this.hasSubmenu();

        delete rest.disabled;
        delete rest.action;
        delete rest.defaultChecked;
        delete rest.defaultActive;
        delete rest.disabled;
        delete rest.shortcut;
        delete rest.checkbox;
        delete rest.icon;
        delete rest.children;

        return React.createElement(
          "li",
          _extends({ style: _extends({}, styles.li, style) }, rest),
          React.createElement(
            "a",
            {
              href: "#",
              onClick: !submenu && action ? this.handleAction : null,
              onMouseOver: this.handleMouseOver,
              onMouseOut: this.handleMouseOut,
              style: this.getStyle()
            },
            submenu ? React.createElement(
              "span",
              { style: styles.arrow },
              "\u25B6"
            ) : "",
            this.createIcon(),
            this.createLabel()
          ),
          submenu ? this.createSubmenu() : null
        );
      }
    }]);

    return MenuItem;
  }(React.Component);

  var PropTypes = React.PropTypes;

  MenuItem.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    style: PropTypes.object,
    label: PropTypes.string,
    children: PropTypes.node,
    defaultActive: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    action: PropTypes.func,
    keepMenu: PropTypes.bool,
    checkbox: PropTypes.bool,
    shortcut: PropTypes.string
  };

  MenuItem.defaultProps = {
    defaultActive: false,
    defaultChecked: false,
    disabled: false
  };

  var Menu = function (_React$Component2) {
    _inherits(Menu, _React$Component2);

    function Menu() {
      _classCallCheck(this, Menu);

      return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
    }

    _createClass(Menu, [{
      key: "render",
      value: function render() {
        var _props4 = this.props,
            display = _props4.display,
            style = _props4.style,
            rest = _objectWithoutProperties(_props4, ["display", "style"]);

        return React.createElement(
          "ul",
          _extends({ style: _extends({}, styles.ul, style, { visibility: display ? "visible" : "hidden" }) }, rest),
          this.props.children
        );
      }
    }]);

    return Menu;
  }(React.Component);

  Menu.propTypes = {
    children: PropTypes.node,
    display: PropTypes.bool,
    style: PropTypes.object
  };

  Menu.defaultProps = { display: true };

  window.ReactMenu = Menu;

  Menu.Item = MenuItem;
})();