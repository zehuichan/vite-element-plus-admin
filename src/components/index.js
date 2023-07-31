import AppProvider from './AppProvider'
import Fullcontent from './Fullcontent'
import Icon from './Icon'
import { SchemaForm, ApiSelect } from './SchemaForm'
import SvgIcon from './SvgIcon'
import IconPark from './IconPark'
import BasicTable from './BasicTable'
import Segmented from './Segmented'
import ToolBar from './ToolBar'
import BasicForm from './BasicForm'
import Field from './Field'
import SearchForm from './SearchForm'

const components = [
  AppProvider,
  Fullcontent,
  Icon,
  SchemaForm,
  ApiSelect,
  SvgIcon,
  IconPark,
  BasicTable,
  Segmented,
  ToolBar,
  BasicForm,
  Field,
  SearchForm,
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
