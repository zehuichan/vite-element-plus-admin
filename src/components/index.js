import Renderer from './Renderer'
import AppProvider from './AppProvider'
import Search from './Search'
import Fullcontent from './Fullcontent'
import Icon from './Icon'
import { Form, ApiSelect } from './Form'
import SvgIcon from './SvgIcon'
import IconPark from './IconPark'
import Segmented from './Segmented'
import ToolBar from './ToolBar'
import BasicForm from './BasicForm'
import Field from './Field'
import Table from './Table'
import Pagination from './Pagination'

const components = [
  Renderer,
  AppProvider,
  Search,
  Form,
  Fullcontent,
  Icon,
  ApiSelect,
  SvgIcon,
  IconPark,
  Segmented,
  ToolBar,
  BasicForm,
  Field,
  Table,
  Pagination,
]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}
