import AppProvider from './AppProvider'
import Renderer from './Renderer'
import Fullcontent from './Fullcontent'
import Icon from './Icon'
import { SchemaForm, ApiSelect } from './SchemaForm'
import SvgIcon from './SvgIcon'
import IconPark from './IconPark'
import Segmented from './Segmented'
import ToolBar from './ToolBar'
import BasicForm from './BasicForm'
import Field from './Field'
import SearchForm from './SearchForm'
import Form from './Form'
import Table from './Table'
import Pagination from './Pagination'

const components = [
  AppProvider,
  Renderer,
  Fullcontent,
  Icon,
  SchemaForm,
  ApiSelect,
  SvgIcon,
  IconPark,
  Segmented,
  ToolBar,
  BasicForm,
  Field,
  SearchForm,
  Form,
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
