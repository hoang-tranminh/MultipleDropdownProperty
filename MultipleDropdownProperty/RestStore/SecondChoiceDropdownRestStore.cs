using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Framework.Web;
using EPiServer.Search;
using EPiServer.Search.Queries.Lucene;
using EPiServer.ServiceLocation;
using EPiServer.Shell.Services.Rest;
using EPiServer.Web;
using System.Collections.Generic;
using System.Linq;

namespace MultipleDropdownProperty.RestStore
{
    [RestStore("secondchoicedropdownreststore")]
    public class SecondChoiceDropdownRestStore: SecondDropDownChoicesStoreBase
    {
        private CategoryRepository _categoryRepository;
        private ContentSearchHandler _contentSearchHandler;
        private TemplateResolver _templateResolver;
        public SecondChoiceDropdownRestStore(CategoryRepository categoryRepository, 
            ContentSearchHandler contentSearchHandler,
            TemplateResolver templateResolver)
        {
            _categoryRepository = categoryRepository;
            _contentSearchHandler = contentSearchHandler;
            _templateResolver = templateResolver;
        }

       
        public override IEnumerable<ChoiceModel> GetChoices(string selectedFirstChoiceId, string currentContentId)
        {
            var catId = -1;
            Category cat = null;
            var currentContent = ContentReference.EmptyReference;
            if (int.TryParse(selectedFirstChoiceId, out catId))
            {
                cat = _categoryRepository.Get(catId);
            }

            if (catId == -1 || cat == null)
            {
                return new List<ChoiceModel>();
            }

            ContentReference.TryParse(currentContentId, out currentContent);

            var resultList = new List<ChoiceModel>();

            var searchHanler = ServiceLocator.Current.GetInstance<SearchHandler>();

            var query = new CategoryQuery(LuceneOperator.OR);
            query.Items.Add(cat.ID.ToString());

            var results = searchHanler.GetSearchResults(query, 1, int.MaxValue);
            resultList.AddRange(results.IndexResponseItems.SelectMany(CreateHitModel));

            if (currentContent != ContentReference.EmptyReference)
                resultList.RemoveAll(i => i.Id == currentContent.ID.ToString());

            return resultList;
        }

        private IEnumerable<ChoiceModel> CreateHitModel(IndexResponseItem responseItem)
        {
            var content = _contentSearchHandler.GetContent<IContent>(responseItem);
            if (content != null && HasTemplate(content) && IsPublished(content as IVersionable))
            {
                yield return CreatePageHit(content);
            }
        }

        private bool HasTemplate(IContent content)
        {
            return _templateResolver.HasTemplate(content, TemplateTypeCategories.Page);
        }

        private bool IsPublished(IVersionable content)
        {
            if (content == null)
                return true;
            return content.Status.HasFlag(VersionStatus.Published);
        }

        private ChoiceModel CreatePageHit(IContent content)
        {
            return new ChoiceModel
            {
                Name = content.Name,
                Id = content.ContentLink.ID.ToString()
            };
        }
    }
}
