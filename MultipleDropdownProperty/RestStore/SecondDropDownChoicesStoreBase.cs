using EPiServer.Shell.Services.Rest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultipleDropdownProperty.RestStore
{
    public abstract class SecondDropDownChoicesStoreBase : RestControllerBase
    {
        public virtual RestResult Get(string selectedFirstChoiceId, string currentContentId)
        {
            return base.Rest(GetChoices(selectedFirstChoiceId, currentContentId));
        }

        /// <summary>
        /// Should return all the choices for first drop down. 
        /// </summary>
        /// <returns></returns>
        public abstract IEnumerable<ChoiceModel> GetChoices(string selectedFirstChoiceId, string currentContentId);

        public virtual RestResult Put(ChoiceModel model)
        {
            throw new NotSupportedException();
        }

        public virtual RestResult Post(ChoiceModel model)
        {
            throw new NotSupportedException();
        }

        public virtual RestResult Delete(string value)
        {
            return null;
        }
    }
}
