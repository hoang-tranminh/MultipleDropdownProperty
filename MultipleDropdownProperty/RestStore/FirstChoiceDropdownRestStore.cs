using EPiServer.DataAbstraction;
using EPiServer.Shell.Services.Rest;
using System.Collections.Generic;

namespace MultipleDropdownProperty.RestStore
{
    [RestStore("firstchoicedropdownreststore")]
    public class FirstChoiceDropdownRestStore : FirstDropDownChoicesStoreBase
    {
        private readonly CategoryRepository _categoryRepository;
        public FirstChoiceDropdownRestStore(CategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        /// <summary>
        /// Build a list of categories, like "cat1","cat1/sub11","cat2","cat2/sub21"
        /// </summary>
        /// <param name="items"></param>
        /// <param name="parent"></param>
        /// <param name="prefix"></param>
        private void BuildCategoryTree(List<ChoiceModel> items, Category parent, string prefix)
        {
            var newPrefix = (prefix ==string.Empty ? string.Empty: (prefix + "/")) + parent.Name;
            items.Add(new ChoiceModel() { Name = newPrefix, Value = parent.ID.ToString(), Id= parent.ID });
            
            foreach (var cat in parent.Categories)
            {
                if (cat.Available && cat.Selectable)
                    BuildCategoryTree(items, cat, newPrefix);
            }
        }

        public override IEnumerable<ChoiceModel> GetChoices(int? id, ItemRange range)
        {
            var choicesList = new List<ChoiceModel>();
            foreach (var cat in _categoryRepository.GetRoot().Categories)
            {
                BuildCategoryTree(choicesList, cat, string.Empty);
            }
            return choicesList;
        }


    }
}
