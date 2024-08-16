import Renderer from './Renderer'
import { AppProvider, AppLocalePicker, AppTitle } from './Application'
import Fullcontent from './Fullcontent'
import Icon from './Icon'
import SvgIcon from './SvgIcon'
import {
  Form,
  ApiCheckbox,
  ApiCheckTag,
  ApiRadioGroup,
  ApiSelect,
  ApiSuggestion,
  ApiTabs,
  ApiTreeSelect,
  Desc,
  Field,
} from './Form'
import Search from './Search'
import { Table } from './Table'
import Pagination from './Pagination'
import Modal from './Modal'
import Drawer from './Drawer'
import { PageWrapper, PageFooter } from './Page'
import { Dropdown, DropdownItem } from './Dropdown'

const components = [
  Renderer,
  AppProvider,
  AppLocalePicker,
  AppTitle,
  Search,
  Table,
  Pagination,

  Form,
  ApiCheckbox,
  ApiCheckTag,
  ApiRadioGroup,
  ApiSelect,
  ApiSuggestion,
  ApiTabs,
  ApiTreeSelect,
  Desc,
  Field,

  Fullcontent,
  Icon,
  SvgIcon,
  Modal,
  Drawer,
  PageWrapper,
  PageFooter,
  Dropdown,
  DropdownItem
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
