using EPiServer.Shell.Services.Rest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultipleDropdownProperty.RestStore
{
    public abstract class FirstDropDownChoicesStoreBase : RestControllerBase
    {
        public virtual RestResult Get(int? id, ItemRange range)
        {
            return base.Rest(GetChoices(id, range));
        }

        /// <summary>
        /// Should return all the choices for first drop down. 
        /// </summary>
        /// <returns></returns>
        public abstract IEnumerable<ChoiceModel> GetChoices(int? id, ItemRange range);

        public virtual RestResult Put(ChoiceModel entity)
        {
            throw new NotSupportedException();
        }

        public virtual RestResult Post(ChoiceModel entity)
        {
            throw new NotSupportedException();
        }

        public virtual RestResult Delete(int id)
        {
            return null;
        }
    }
}
